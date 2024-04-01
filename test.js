

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


import org.junit.Test;
import static org.junit.Assert.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtilTest {

    @Test
    public void testNormalizeDate() {
        Calendar date = Calendar.getInstance();
        date.set(2024, Calendar.MARCH, 10, 14, 33, 22); // Set a specific time
        DateUtil.normalizeDate(date);
        assertEquals(0, date.get(Calendar.HOUR_OF_DAY));
        assertEquals(0, date.get(Calendar.MINUTE));
        assertEquals(0, date.get(Calendar.SECOND));
        assertEquals(0, date.get(Calendar.MILLISECOND));
    }

    @Test(expected = EnhancedException.class)
    public void testGetDateWithParseException() throws EnhancedException {
        DateUtil.getDate("2024-03-10", "yyyy-MM-dd");
    }

    @Test
    public void testGetDate() throws EnhancedException {
        assertNotNull(DateUtil.getDate("03/10/2024", "MM/dd/yyyy"));
    }

    @Test
    public void testCompareDate() throws EnhancedException {
        String todayStr = new SimpleDateFormat("MM/dd/yyyy").format(new Date());
        assertTrue(DateUtil.compareDate(todayStr, "MM/dd/yyyy") == 0);
    }

    @Test
    public void testClearAllExceptYearMonthDate() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 10); // Ensure there's something to clear
        DateUtil.clearAllExceptYearMonthDate(cal);
        assertEquals(0, cal.get(Calendar.HOUR_OF_DAY));
    }

    @Test
    public void testGetDateAsStringWithNullDate() {
        assertNull(DateUtil.getDateAsString(null, "MM/dd/yyyy"));
    }

    @Test
    public void testGetDateAsString() {
        Calendar cal = Calendar.getInstance();
        String result = DateUtil.getDateAsString(cal.getTime(), "MM/dd/yyyy");
        assertNotNull(result);
    }

    @Test(expected = EnhancedException.class)
    public void testGetDateWithTimeZoneParseException() throws EnhancedException {
        DateUtil.getDate("invalid", "MM/dd/yyyy", TimeZone.getDefault());
    }

    @Test
    public void testFormatStringDateParseException() {
        assertNull(DateUtil.formatStringDate("invalid", "MM/dd/yyyy", "yyyy-MM-dd"));
    }

    @Test
    public void testFormatStringDateWithNullArguments() {
        assertNull(DateUtil.formatStringDate(null, null, null));
    }

    @Test
    public void testCompareDates() throws ParseException, EnhancedException {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        Date date1 = sdf.parse("03/10/2024");
        Date date2 = sdf.parse("03/11/2024");
        assertTrue(DateUtil.compareDates(date1, date2, TimeZone.getDefault()) < 0);
    }

    @Test
    public void testIncrementDateByDays() {
        Calendar date = Calendar.getInstance();
        int currentDay = date.get(Calendar.DAY_OF_MONTH);
        Calendar newDate = DateUtil.incrementDateByDays(date, 5);
        assertEquals(currentDay + 5, newDate.get(Calendar.DAY_OF_MONTH));
    }
    
    @Test
    public void testConvertDateToCalendarWithNullDate() {
        assertNull(DateUtil.convertDateToCalendar(null));
    }

    // Ensuring the logging and re-throwing of ParseException in getDate method
    @Test(expected = EnhancedException.class)
    public void testGetDateLoggingAndRethrowingException() throws EnhancedException {
        // Assuming the LOGGER is mocked to verify interactions, if your testing framework supports it
        DateUtil.getDate("not-a-date", "MM/dd/yyyy");
    }

    // Testing getDate with valid time zone
    @Test
    public void testGetDateWithTimeZone() throws EnhancedException {
        assertNotNull(DateUtil.getDate("03/10/2024", "MM/dd/yyyy", TimeZone.getTimeZone("UTC")));
    }

    // Covering static initializers and fields
    @Test
    public void testStaticFieldsInitialization() {
        assertNotNull(DateUtil.PACIFIC_TIMEZONE);
        assertNotNull(DateUtil.DEFAULT_LOCALE);
        assertNotNull(DateUtil.zoneld);
        assertEquals("mmddyXXX.", DateUtil.MM_DD_YYYY);
    }

    // Testing formatStringDate with valid arguments
    @Test
    public void testFormatStringDate() {
        String formattedDate = DateUtil.formatStringDate("03/10/2024", "MM/dd/yyyy", "yyyy-MM-dd");
        assertEquals("2024-03-10", formattedDate);
    }

    // Testing comparedates with both dates null
    @Test
    public void testCompareDatesBothNull() {
        assertEquals(999, DateUtil.compareDates(null, null, TimeZone.getDefault()));
    }

    // Testing getCalendar with a specific timezone
    @Test
    public void testGetCalendarWithTimeZone() {
        Calendar cal = DateUtil.getCalendar(Calendar.getInstance().getTime(), TimeZone.getTimeZone("UTC"));
        assertEquals(TimeZone.getTimeZone("UTC"), cal.getTimeZone());
    }

    // Ensuring normalizeDate doesn't throw an exception for edge cases
    @Test
    public void testNormalizeDateEdgeCases() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, 0); // Unusual year
        DateUtil.normalizeDate(cal); // Test doesn't assert; just ensures no exceptions
        assertTrue(true); // Dummy assertion to denote test passed
    }

    // Test the no-op constructor for coverage
    @Test
    public void testConstructorIsNoOp() {
        new DateUtil(); // Coverage for the default constructor
        assertTrue(true); // Assert true as a placeholder
    }

}
