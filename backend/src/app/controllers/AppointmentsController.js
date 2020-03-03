/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointments from '../models/Appointments';
import User from '../models/User';

class AppointmentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // Check if provider_id is a provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    // O parseISO transformará uma String de Data para um Objeto de data que o JS reconhece
    // O startOfHour transformará essa data para o começo de uma hora, ex: 19h30 vira 19h00
    const hourStart = startOfHour(parseISO(date));

    // Verifica se a hora do agendamento está anterior à data atual
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited' });
    }

    // Verifica o prestador possui o horário disponível
    const checkAvailability = await Appointments.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    // Se encontrar o checkAvailability (for true) significa que o horário não está disponível
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointments.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentsController();
