

const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: '10.102.206.75',
      port: 25,
      secure: false, // true for 465, false for other ports
      tls:{
        rejectUnauthorized:false,
      },
      auth: {
        user: 'Meghna.chattaraj@vcontractor.co.za',
        pass: 'P@$$w0rd25@2023'
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Meghna.chattaraj@vcontractor.co.za', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
  }
}
sendEmail('kumarshubham562@gmail.com','scan reference','heyyy your refrence');


 @Test
    public void compareDatesSameDayReturnsZero() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        Date date1 = sdf.parse("12/31/2024");
        Date date2 = sdf.parse("12/31/2024");
        assertEquals(0, DateUtil.compareDates(date1, date2, TimeZone.getDefault()));
    }

    // Test case to ensure coverage of "return -1"
    @Test
    public void compareDatesFirstBeforeSecondReturnsMinusOne() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        Date date1 = sdf.parse("12/30/2024");
        Date date2 = sdf.parse("12/31/2024");
        assertEquals(-1, DateUtil.compareDates(date1, date2, TimeZone.getDefault()));
    }

    // Test case to ensure coverage of "return firstCal.after(secondCal) ? 1 : 999;"
    @Test
    public void compareDatesFirstAfterSecondReturnsOne() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        Date date1 = sdf.parse("01/01/2025");
        Date date2 = sdf.parse("12/31/2024");
        assertEquals(1, DateUtil.compareDates(date1, date2, TimeZone.getDefault()));
    }

    // Ensure coverage for "return 999" when one or both dates are null
    @Test
    public void compareDatesWithNullDatesReturns999() {
        assertEquals(999, DateUtil.compareDates(null, null, TimeZone.getDefault()));
        assertEquals(999, DateUtil.compareDates(new Date(), null, TimeZone.getDefault()));
        assertEquals(999, DateUtil.compareDates(null, new Date(), TimeZone.getDefault()));
    }
