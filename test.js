

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



import static org.junit.Assert.*;
import org.junit.Test;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class DateUtilTest {

    // Helper method to create Date objects
    private Date createDate(String dateString, String format, TimeZone timeZone) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        sdf.setTimeZone(timeZone);
        return sdf.parse(dateString);
    }

    @Test
    public void testNormalizeDate() {
        Calendar date = Calendar.getInstance();
        date.set(2024, Calendar.MARCH, 10, 14, 33, 22); // Arbitrary non-normalized date
        DateUtil.normalizeDate(date);
        assertEquals(0, date.get(Calendar.HOUR_OF_DAY));
        assertEquals(0, date.get(Calendar.MINUTE));
        assertEquals(0, date.get(Calendar.SECOND));
        assertEquals(0, date.get(Calendar.MILLISECOND));
    }

    @Test(expected = EnhancedException.class)
    public void testGetDateWithInvalidFormat() throws EnhancedException {
        DateUtil.getDate("2024-03-10", "wrong-format");
    }

    @Test
    public void testCompareDate() throws Exception {
        // Assuming today is 2024-03-10
        String todayStr = new SimpleDateFormat("MM/dd/yyyy").format(new Date());
        int comparisonResult = DateUtil.compareDate(todayStr, "MM/dd/yyyy");
        assertEquals(0, comparisonResult); // The dates are equal
    }

    @Test
    public void testClearAllExceptYearMonthDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(2024, Calendar.MARCH, 10, 14, 33, 22);
        DateUtil.clearAllExceptYearMonthDate(calendar);
        assertEquals(2024, calendar.get(Calendar.YEAR));
        assertEquals(Calendar.MARCH, calendar.get(Calendar.MONTH));
        assertEquals(10, calendar.get(Calendar.DATE));
        assertEquals(0, calendar.get(Calendar.HOUR_OF_DAY));
        assertEquals(0, calendar.get(Calendar.MINUTE));
        assertEquals(0, calendar.get(Calendar.SECOND));
        assertEquals(0, calendar.get(Calendar.MILLISECOND));
    }

    @Test
    public void testGetDateAsString() throws Exception {
        Date date = createDate("2024/03/10", "yyyy/MM/dd", TimeZone.getDefault());
        String formattedDate = DateUtil.getDateAsString(date, "MM/dd/yyyy");
        assertEquals("03/10/2024", formattedDate);
    }

    @Test
    public void testFormatStringDate() throws Exception {
        String originalDateStr = "10-03-2024";
        String formattedDate = DateUtil.formatStringDate(originalDateStr, "dd-MM-yyyy", "MM/dd/yyyy");
        assertEquals("03/10/2024", formattedDate);
    }

    @Test
    public void testCompareDates() throws Exception {
        Date date1 = createDate("2024/03/10", "yyyy/MM/dd", TimeZone.getDefault());
        Date date2 = createDate("2024/03/11", "yyyy/MM/dd", TimeZone.getDefault());
        int comparisonResult = DateUtil.compareDates(date1, date2, TimeZone.getDefault());
        assertTrue(comparisonResult < 0); // date1 is before date2
    }

    @Test
    public void testIncrementDateByDays() {
        Calendar date = Calendar.getInstance();
        date.set(2024, Calendar.MARCH, 10);
        Calendar newDate = DateUtil.incrementDateByDays(date, 5);
        assertEquals(15, newDate.get(Calendar.DAY_OF_MONTH));
    }

    // Add more tests here to cover other methods and scenarios
}
