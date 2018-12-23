const { Ad } = require('../models')

class AdController {
  async index (req, res) {
    const {
      price_min: priceMin,
      price_max: priceMax,
      page = 1,
      title
    } = req.query

    const filters = {}

    const options = {
      sort: '-createdAt',
      limit: 5,
      populate: ['author'],
      page
    }

    if (title) {
      filters.title = new RegExp(title, 'i')
    }

    if (priceMin || priceMax) {
      filters.price = {}

      if (priceMin) {
        filters.price.$gte = priceMin
      }

      if (priceMax) {
        filters.price.$lte = priceMax
      }
    }

    const ads = await Ad.paginate(filters, options)
    return res.json(ads)
  }

  async show (req, res) {
    const ad = await Ad.findOne({ _id: req.params.id })
    return res.json(ad)
  }

  async store (req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })
    return res.json(ad)
  }

  async update (req, res) {
    const ad = await Ad.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    })

    return res.json(ad)
  }

  async destroy (req, res) {
    await Ad.findOneAndDelete({ _id: req.params.id })
    return res.json({})
  }
}

module.exports = new AdController()
