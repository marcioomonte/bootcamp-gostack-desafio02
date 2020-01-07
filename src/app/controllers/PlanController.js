import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    return res.json(await Plan.findAll());
  }

  async store(req, res) {
    const { title, duration, price } = await Plan.create(req.body);
    return res.json({ title, duration, price });
  }
  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    plan.destroy();

    return res.status(200).json({ message: 'Deleted!' });
  }
}

export default new PlanController();
