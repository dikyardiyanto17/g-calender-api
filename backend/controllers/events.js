const { google } = require("googleapis");
const Event = require("../schema/Event");
const nodemailer = require("nodemailer");
const User = require("../schema/User");

const oauth2Client = new google.auth.OAuth2(
  "590607211046-qkalmrqhj5de79s05sth7pnsoajiklvb.apps.googleusercontent.com",
  "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",
  "http://localhost:3000"
);
oauth2Client.setCredentials({
  refresh_token:
    "1//04_Nekl5uuHS2CgYIARAAGAQSNwF-L9Ir4YAv_NcTbt2MvY7VCBhlV2ljZyHme-M2Ex2mJEPlxdfOYbFn0PoHRxvzQpIL-ISlFcM",
});

class Events {
  // static mailer(sendto, link) {
  //   let transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "dicapricornus17@gmail.com",
  //       pass: "ylmdmaszkjrtfdoa",
  //     },
  //   });

  //   let mailOptions = {
  //     from: "dicapricornus@gmail.com",
  //     to: sendto,
  //     subject: `Invite You`,
  //     html: link,
  //   };

  //   transporter.sendMail(mailOptions, (err, info) => {
  //     if (err) {
  //       console.log(err, "<<<<<<<");
  //     } else {
  //       console.log(info, "Berhasil kirim email <<<<<<<");
  //     }
  //   });
  // }

  static async newEvent(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const { NamaKegiatan, JamMulai, JamSelesai, invite1, invite2, invite3 } =
        req.body;
      let participant = [{ email: user.email }];
      if (!NamaKegiatan) {
        throw { name: "Bad Request", message: "Event Name is empty" };
      }
      if (!JamMulai) {
        throw { name: "Bad Request", message: "Event Starting at is empty" };
      }
      if (!JamSelesai) {
        throw { name: "Bad Request", message: "Event Ending at is empty" };
      }
      if (invite1) {
        participant.push({ email: invite1 });
      }
      if (invite2) {
        participant.push({ email: invite2 });
      }
      if (invite3) {
        participant.push({ email: invite3 });
      }
      await Event.create({
        NamaKegiatan,
        Tanggal: JamMulai,
        JamMulai,
        JamSelesai,
      });
      const calender = google.calendar("v3");
      await calender.events.insert({
        auth: oauth2Client,
        calendarId: "primary",
        sendNotifications: true,
        requestBody: {
          summary: NamaKegiatan,
          description: NamaKegiatan,
          colorId: "2",
          start: { dateTime: new Date(JamMulai) },
          end: { dateTime: new Date(JamSelesai) },
          attendees: participant,
          anyoneCanAddSelf: true,
          attendeesOmitted: true,
          organizer: { email: user.email },
        },
      });
      //   participant.forEach(x => {
      //         Events.mailer(x.email, response.data.htmlLink)
      //   });
      return res.status(201).json({ message: "Success creating event" });
    } catch (error) {
      next(error);
    }
  }

  static async events(req, res, next) {
    try {
      let data2 = await Event.find();
      const formatedDate = (date) => {
        return new Date(date)
          .toLocaleString("en-ZA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "-");
      };

      const formatedDate2 = (date) => {
        return new Date(date)
          .toLocaleString("en-ZA", { hour: "2-digit", minute: "2-digit" })
          .replace(/\//g, "-");
      };

      const data = data2.map((theData) => {
        if (
          theData.JamMulai >= new Date() &&
          theData.JamSelesai <= new Date()
        ) {
          theData.status = "Sedang Dilaksanakan";
        } else if (theData.JamMulai >= new Date()) {
          theData.status = "Belum Dilaksanakan";
        } else if (theData.JamMulai <= new Date()) {
          theData.status = "Telah Dilaksanakan";
        }
        const newData = {
          NamaKegiatan: theData.NamaKegiatan,
          status: theData.status,
        };
        newData.Tanggal = formatedDate(theData.Tanggal);
        newData.JamMulai = formatedDate2(theData.JamMulai);
        newData.JamSelesai = formatedDate2(theData.JamSelesai);
        return newData;
      });

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateEvent(req, res, next) {
    try {
      const { NamaKegiatan, Tanggal, JamMulai, JamSelesai } = req.body;
      const { id } = req.params;
      let updatingData = {};
      if (NamaKegiatan) {
        updatingData.NamaKegiatan = NamaKegiatan;
      }
      if (Tanggal) {
        updatingData.Tanggal = Tanggal;
      }
      if (JamMulai) {
        updatingData.JamMulai = JamMulai;
      }
      if (JamSelesai) {
        updatingData.JamSelesai = JamSelesai;
      }
      const data = await Event.findOneAndUpdate(
        {
          _id: id,
        },
        updatingData
      );
      return res
        .status(200)
        .json({ message: "Success Updating " + data.NamaKegiatan });
    } catch (error) {
      next(error);
    }
  }

  static async deleteEvent(req, res, next) {
    try {
      const { id } = req.params;
      await Event.findByIdAndDelete(id);
      return res.status(200).json({ message: "Success Deleting Event" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { Events };
