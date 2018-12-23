const { Ad, User } = require('../models')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const [purchaseAd, user] = await Promise.all([
      Ad.findOne({ _id: ad }).populate('author'),
      User.findOne({ _id: req.userId })
    ])

    try {
      await Mail.sendMail({
        from: 'Nicolas Renard <nicolasrenard1999@gmail.com>',
        to: purchaseAd.author.email,
        subject: `Solicitação de compra ${purchaseAd.title}`,
        template: 'purchase',
        context: { ad: purchaseAd, user, content }
      })
    } catch (err) {
      console.log('err: ', err)
    }

    return res.json({ purchaseAd, user })
  }
}

module.exports = new PurchaseController()
