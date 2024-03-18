

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
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class ReliefCenterUtilTest {

    @Test
    public void testAccountKeyGrpHoganGetter() {
        // Mocking necessary objects
        Account account = Mockito.mock(Account.class);
        AccountProfile accountProfile = Mockito.mock(AccountProfile.class);
        AccountKey accountKey = Mockito.mock(AccountKey.class);
        AccountKeyGrpHogan accountKeyGrpHogan = Mockito.mock(AccountKeyGrpHogan.class);
        
        // Setting up mock behavior
        Mockito.when(account.getAccountProfile()).thenReturn(accountProfile);
        Mockito.when(accountProfile.getAccountKey()).thenReturn(accountKey);
        Mockito.when(accountKey.getAccountKeyGrpHogan()).thenReturn(accountKeyGrpHogan);

        // Calling the method under test
        Optional<AccountKeyGrpHogan> result = ReliefCenterUtil.accountKeyGrpHoganGetter.apply(account);
        
        // Asserting the result
        assertTrue(result.isPresent());
    }

    @Test
    public void testHoganProductTypeGetter() {
        // Mocking necessary objects
        Account account = Mockito.mock(Account.class);
        AccountProfile accountProfile = Mockito.mock(AccountProfile.class);
        AccountKey accountKey = Mockito.mock(AccountKey.class);
        AccountKeyGrpHogan accountKeyGrpHogan = Mockito.mock(AccountKeyGrpHogan.class);
        HoganProductType hoganProductType = new HoganProductType("TestProduct");
        
        // Setting up mock behavior
        Mockito.when(account.getAccountProfile()).thenReturn(accountProfile);
        Mockito.when(accountProfile.getAccountKey()).thenReturn(accountKey);
        Mockito.when(accountKey.getAccountKeyGrpHogan()).thenReturn(accountKeyGrpHogan);
        Mockito.when(accountKeyGrpHogan.getAccountKeyGrpHogan()).thenReturn(hoganProductType);

        // Calling the method under test
        Optional<HoganProductType> result = ReliefCenterUtil.hoganProductTypeGetter.apply(account);
        
        // Asserting the result
        assertTrue(result.isPresent());
        assertEquals("TestProduct", result.get().getCode());
    }

    @Test
    public void testHoganProductCodeGetter() {
        // Mocking necessary objects
        Account account = Mockito.mock(Account.class);
        HoganProductType hoganProductType = new HoganProductType("TestProduct");
        
        // Setting up mock behavior
        Mockito.when(ReliefCenterUtil.hoganProductTypeGetter.apply(account)).thenReturn(Optional.of(hoganProductType));

        // Calling the method under test
        Optional<String> result = ReliefCenterUtil.hoganProductCodeGetter.apply(account);
        
        // Asserting the result
        assertTrue(result.isPresent());
        assertEquals("TestProduct", result.get());
    }

    @Test
    public void testAccountManagerGetter() {
        // Mocking necessary objects
        DomainServices domainServices = Mockito.mock(DomainServices.class);
        OnLineBankingSession onLineBankingSession = Mockito.mock(OnLineBankingSession.class);
        CustomerManager customerManager = Mockito.mock(CustomerManager.class);
        AccountManager accountManager = new AccountManager();
        
        // Setting up mock behavior
        Mockito.when(domainServices.getOnLineBankingSession()).thenReturn(onLineBankingSession);
        Mockito.when(onLineBankingSession.getCustomerManager()).thenReturn(customerManager);
        Mockito.when(customerManager.getAccountManager()).thenReturn(accountManager);

        // Calling the method under test
        Optional<AccountManager> result = ReliefCenterUtil.accountManagerGetter.apply(domainServices);
        
        // Asserting the result
        assertTrue(result.isPresent());
        assertEquals(accountManager, result.get());
    }

    @Test
    public void testBalanceAmountGetter() {
        // Mocking necessary objects
        Balance balance = Mockito.mock(Balance.class);
        Amount amount = Mockito.mock(Amount.class);
        BigDecimal expectedAmount = new BigDecimal("100.50");
        
        // Setting up mock behavior
        Mockito.when(balance.getAmount()).thenReturn(amount);
        Mockito.when(amount.getAmount()).thenReturn(expectedAmount);

        // Calling the method under test
        Optional<BigDecimal> result = ReliefCenterUtil.balanceAmountGetter.apply(balance);
        
        // Asserting the result
        assertTrue(result.isPresent());
        assertEquals(expectedAmount, result.get());
    }

    @Test
    public void testCommonStartupContextGetter() {
        // Mocking necessary objects
        DomainServices domainServices = Mockito.mock(DomainServices.class);
        OnLineBankingServicingWebSession onLineBankingServicingWebSession = Mockito.mock(OnLineBankingServicingWebSession.class);
        CommonStartupContext commonStartupContext = new CommonStartupContext();
        
        // Setting up mock behavior
        Mockito.when(domainServices.getOnlineBankingServicingWebSession()).thenReturn(onLineBankingServicingWebSession);
        Mockito.when(onLineBankingServicingWebSession.getCommonStartupContext()).thenReturn(commonStartupContext);

        // Calling the method under test
        Optional<CommonStartupContext> result = ReliefCenterUtil.commonStartupContextGetter.apply(domainServices);
        
        // Asserting the result
        assertTrue(result.isPresent());
        assertEquals(commonStartupContext, result.get());
    }

    @Test
    public void testRetrieveQuestionSystemsErrorsGetter() {
        // Mocking necessary objects
        RetrieveQuestionsResponseTO retrieveQuestionsResponseTO = Mockito.mock(RetrieveQuestionsResponseTO.class);
        RetrieveQuestionsResponse retrieveQuestionsResponse = Mockito.mock(RetrieveQuestionsResponse.class);
        SystemError systemError = new SystemError();
        
        // Setting up mock behavior
        Mockito.when(retrieveQuestionsResponseTO.getResponse()).thenReturn(retrieveQuestionsResponse);
        Mockito.when(retrieveQuestionsResponse.getSystemErrors()).thenReturn(Collections.singletonList(systemError));

        // Calling the method under test
        Optional<List<SystemError>> result = ReliefCenterUtil.retrieveQuestionSystemsErrorsGetter.apply(retrieveQuestionsResponseTO);
        
        // Asserting the result
        assertTrue(result.isPresent());
        assertEquals(1, result.get().size());
        assertEquals(systemError, result.get().get(0));
    }

    @Test
    public void testBuildCasmDelegateHeaderMap() {
        // Calling the method under test
        String unitOfWorkID = "unitOfWorkID";
        Map<String, String> headerMap = ReliefCenterUtil.buildCasmDelegateHeaderMap(unitOfWorkID);

        // Asserting the result
        assertEquals(5, headerMap.size());
        assertTrue(headerMap.containsKey("WF_SENDERMESSAGEID_HEADER"));
        assertTrue(headerMap.containsKey("WF_CREATIONTIMESTAMP_HEADER"));
        assertTrue(headerMap.containsKey("WF_SENDERAPPLICATIONID_HEADER"));
        assertTrue(headerMap.containsKey("WF_SENDERHOSTNAME_HEADER_HEADER"));
        assertTrue(headerMap.containsKey("WF_SESSIONID_HEADER"));
    }
}
