import * as Yup from 'yup';

import User from '../models/User';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email()
        .required('Name is required'),
      age: Yup.number()
        .required('Name is required')
        .moreThan(0),
      weight: Yup.number()
        .required('Name is required')
        .moreThan(0),
      height: Yup.number()
        .required('Name is required')
        .moreThan(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation Fails.' });
    }
    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(401).json({ error: 'Student already exists' });
    }

    const { name, age, weight, height } = await Student.create(req.body);

    return res.json({ name, email, age, weight, height });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().moreThan(0),
      weight: Yup.number().moreThan(0),
      height: Yup.number().moreThan(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation Fails.' });
    }

    const { email } = req.body;

    const student = await Student.findOne({ where: { email } });

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    const { id, name, age, weight, height } = await student.update(req.body);

    return res.json({ id, name, email, age, weight, height });
  }
}

export default new StudentController();
