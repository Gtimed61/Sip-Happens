const { AuthenticationError } = require('apollo-server-express');
const { User, Coffee, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
      categories: async () => {
        return await Category.find();
      },
      coffee: async (parent, { category, name }) => {
        const params = {};
  
        if (category) {
          params.category = category;
        }
  
        if (name) {
          params.name = {
            $regex: name
          };
        }
  
        return await Coffee.find(params)
        .popilate('comment')
        .populate('category');
      },
       coffee: async (parent, { _id }) => {
        return await Coffee.findById(_id)
        .populate('comment')
        .populate('category');
      },
      //Comment Queries
      comments: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Thought.find(params).sort({ createdAt: -1 });
      },
      comment: async (parent, { _id }) => {
        return Thought.findOne({ _id });
      },
      user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.coffee',
            populate: 'category'
          });
  
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
          return user;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      order: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.coffee',
            populate: 'category'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in');
      },
      // Comment and Reaction mutations
      addComment: async (parent, args, context) => {
        if (context.user) {
          const comment = await Comment.create({ ...args, username: context.user.username });
  
          await Coffee.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
  
          return thought;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      addReaction: async (parent, { thoughtId, reactionBody }, context) => {
        if (context.user) {
          const updatedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $push: { reactions: { reactionBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
  
          return updatedThought;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      checkout: async (parent, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ coffees: args.coffees });
        const line_items = [];
  
        const { products } = await order.populate('coffees');
  
        for (let i = 0; i < products.length; i++) {
          const coffee = await stripe.coffee.create({
            name: coffee[i].name,
            description: coffee[i].description,
            // insert url from api
            images: [`${url}/images/${coffees[i].image}`]
          });
  
          const price = await stripe.prices.create({
            coffee: coffee.id,
            unit_amount: coffee[i].price * 100,
            currency: 'usd',
          });
  
          line_items.push({
            price: price.id,
            quantity: 1
          });
        }
  
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`
        });
  
        return { session: session.id };
      }
    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      addOrder: async (parent, { coffees }, context) => {
        console.log(context);
        if (context.user) {
          const order = new Order({ coffees });
  
          await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
          return order;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateCoffee: async (parent, { _id, quantity }) => {
        const decrement = Math.abs(quantity) * -1;
  
        return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      }
    }
  };
  
  module.exports = resolvers;