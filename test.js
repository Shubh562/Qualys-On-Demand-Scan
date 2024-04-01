

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
public void testConstructor() {
    new DateUtil(); // This is solely to cover the constructor in coverage reports.
}

@Test(expected = EnhancedException.class)
public void testGetDateParseException() throws EnhancedException {
    DateUtil.getDate("invalid-date-format", "MM/dd/yyyy");
}


@Test
public void testGetDateAsStringWithNulls() {
    assertNull("Should return null when date or format is null", DateUtil.getDateAsString(null, null));
}


@Test
public void testFormatStringDateParseException() {
    assertNull("Should return null for unparseable date string", DateUtil.formatStringDate("not-a-date", "MM/dd/yyyy", "yyyy-MM-dd"));
}

@Test
public void testFormatStringDateWithNullArguments() {
    assertNull("Should return null when any argument is null", DateUtil.formatStringDate(null, null, null));
}

@Test
public void testCompareDatesFirstDateNull() {
    assertEquals("Should return 999 if firstDate is null", 999, DateUtil.compareDates(null, new Date(), TimeZone.getDefault()));
}

@Test
public void testCompareDatesSecondDateNull() {
    assertEquals("Should return 999 if secondDate is null", 999, DateUtil.compareDates(new Date(), null, TimeZone.getDefault()));
}

@Test
public void testCompareDatesBothDatesNull() {
    assertEquals("Should return 999 if both dates are null", 999, DateUtil.compareDates(null, null, TimeZone.getDefault()));
}

@Test
public void testCompareDatesEqualDates() throws Exception {
    Date date1 = createDate("2024/03/10", "yyyy/MM/dd", TimeZone.getDefault());
    Date date2 = createDate("2024/03/10", "yyyy/MM/dd", TimeZone.getDefault());
    assertEquals("Should return 0 for equal dates", 0, DateUtil.compareDates(date1, date2, TimeZone.getDefault()));
}

@Test
public void testCompareDatesFirstDateBefore() throws Exception {
    Date date1 = createDate("2024/03/09", "yyyy/MM/dd", TimeZone.getDefault());
    Date date2 = createDate("2024/03/10", "yyyy/MM/dd", TimeZone.getDefault());
    assertEquals("Should return -1 if firstDate is before secondDate", -1, DateUtil.compareDates(date1, date2, TimeZone.getDefault()));
}

@Test
public void testCompareDatesFirstDateAfter() throws Exception {
    Date date1 = createDate("2024/03/11", "yyyy/MM/dd", TimeZone.getDefault());
    Date date2 = createDate("2024/03/10", "yyyy/MM/dd", TimeZone.getDefault());
    assertEquals("Should return 1 if firstDate is after secondDate", 1, DateUtil.compareDates(date1, date2, TimeZone.getDefault()));
}
