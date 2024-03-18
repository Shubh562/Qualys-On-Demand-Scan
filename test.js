

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
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.text.SimpleDateFormat;
import java.util.UUID;

import org.junit.Test;

public class ReliefCenterUtilTest {

  @Test
  public void testAccountKeyGrpHoganGetter() {
    // Mock Account with AccountProfile and AccountKey
    Account mockAccount = mock(Account.class);
    AccountProfile mockProfile = mock(AccountProfile.class);
    AccountKey mockKey = mock(AccountKey.class);
    HoganProductType mockProductType = mock(HoganProductType.class);
    String mockCode = "MOCK_CODE";

    // Test with valid Account
    when(mockAccount.getAccountProfile()).thenReturn(mockProfile);
    when(mockProfile.getAccountKey()).thenReturn(mockKey);
    when(mockKey.getAccountKeyGrpHogan()).thenReturn(mockProductType);
    when(mockProductType.getCode()).thenReturn(mockCode);

    Optional<AccountKeyGrpHogan> result = ReliefCenterUtil.accountKeyGrpHoganGetter.apply(mockAccount);

    assertTrue(result.isPresent());
    assertEquals(mockCode, result.get().getCode());

    // Test with null Account
    reset(mockAccount); // Reset mocks for next test
    result = ReliefCenterUtil.accountKeyGrpHoganGetter.apply(null);
    assertFalse(result.isPresent());
  }

  @Test
  public void testHoganProductTypeGetter() {
    // Mock Account with AccountProfile and AccountKey
    Account mockAccount = mock(Account.class);
    AccountProfile mockProfile = mock(AccountProfile.class);
    AccountKey mockKey = mock(AccountKey.class);
    HoganProductType mockProductType = mock(HoganProductType.class);

    // Test with valid Account
    when(mockAccount.getAccountProfile()).thenReturn(mockProfile);
    when(mockProfile.getAccountKey()).thenReturn(mockKey);
    when(mockKey.getAccountKeyGrpHogan()).thenReturn(mockProductType);

    Optional<HoganProductType> result = ReliefCenterUtil.hoganProductTypeGetter.apply(mockAccount);

    assertTrue(result.isPresent());
    assertEquals(mockProductType, result.get());

    // Test with empty Optional
    Optional<Account> emptyOptional = Optional.empty();
    result = ReliefCenterUtil.hoganProductTypeGetter.apply(emptyOptional);

    assertFalse(result.isPresent());
  }

  @Test
  public void testHoganProductCodeGetter() {
    // Mock Account with AccountProfile and AccountKey
    Account mockAccount = mock(Account.class);
    AccountProfile mockProfile = mock(AccountProfile.class);
    AccountKey mockKey = mock(AccountKey.class);
    HoganProductType mockProductType = mock(HoganProductType.class);
    String mockCode = "MOCK_CODE";

    when(mockAccount.getAccountProfile()).thenReturn(mockProfile);
    when(mockProfile.getAccountKey()).thenReturn(mockKey);
    when(mockKey.getAccountKeyGrpHogan()).thenReturn(mockProductType);
    when(mockProductType.getCode()).thenReturn(mockCode);

    Optional<String> result = ReliefCenterUtil.hoganProductCodeGetter.apply(mockAccount);

    assertTrue(result.isPresent());
    assertEquals(mockCode, result.get());

    // Test with empty Optional
    Optional<HoganProductType> emptyOptional = Optional.empty();
    result = ReliefCenterUtil.hoganProductCodeGetter.apply(emptyOptional);

    assertFalse(result.isPresent());
  }

  @Test
  public void testAccountManagerGetter() {
    // Mock DomainServices, OnLineBankingSession, CustomerManager, and AccountManager
    DomainServices mockServices = mock(DomainServices.class);
    OnLineBankingSession mockSession = mock(OnLineBankingSession.class);
    CustomerManager mockCustomerManager = mock(CustomerManager.class);
    AccountManager mockAccountManager = mock(AccountManager.class);

    // Test with valid DomainServices
    when(mockServices.getOnLineBankingSession()).thenReturn(mockSession);
    when(mockSession.getCustomerManager()).thenReturn(mockCustomerManager);
    when(mockCustomerManager.getAccountManager()).thenReturn(mockAccountManager);

    Optional<Account
