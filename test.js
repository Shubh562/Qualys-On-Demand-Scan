

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
import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class ReliefCenterUtilTest {

    @Test
    public void testAccountKeyGrpHoganGetter() {
        Account account = Mockito.mock(Account.class);
        AccountProfile accountProfile = Mockito.mock(AccountProfile.class);
        AccountKeyGrpHogan accountKeyGrpHogan = Mockito.mock(AccountKeyGrpHogan.class);
        Mockito.when(account.getAccountProfile()).thenReturn(accountProfile);
        Mockito.when(accountProfile.getAccountKey()).thenReturn(accountKeyGrpHogan);

        Optional<AccountKeyGrpHogan> result = ReliefCenterUtil.accountKeyGrpHoganGetter.apply(account);
        assertTrue(result.isPresent());
    }

    @Test
    public void testHoganProductTypeGetter() {
        Account account = Mockito.mock(Account.class);
        AccountProfile accountProfile = Mockito.mock(AccountProfile.class);
        AccountKeyGrpHogan accountKeyGrpHogan = Mockito.mock(AccountKeyGrpHogan.class);
        HoganProductType hoganProductType = Mockito.mock(HoganProductType.class);
        Mockito.when(account.getAccountProfile()).thenReturn(accountProfile);
        Mockito.when(accountProfile.getAccountKey()).thenReturn(accountKeyGrpHogan);
        Mockito.when(accountKeyGrpHogan.getHoganProductType()).thenReturn(hoganProductType);

        Optional<HoganProductType> result = ReliefCenterUtil.hoganProductTypeGetter.apply(account);
        assertTrue(result.isPresent());
    }

    @Test
    public void testHoganProductCodeGetter() {
        Account account = Mockito.mock(Account.class);
        AccountProfile accountProfile = Mockito.mock(AccountProfile.class);
        AccountKeyGrpHogan accountKeyGrpHogan = Mockito.mock(AccountKeyGrpHogan.class);
        HoganProductType hoganProductType = Mockito.mock(HoganProductType.class);
        Mockito.when(account.getAccountProfile()).thenReturn(accountProfile);
        Mockito.when(accountProfile.getAccountKey()).thenReturn(accountKeyGrpHogan);
        Mockito.when(accountKeyGrpHogan.getHoganProductType()).thenReturn(hoganProductType);
        Mockito.when(hoganProductType.getCode()).thenReturn("productCode");

        Optional<String> result = ReliefCenterUtil.hoganProductCodeGetter.apply(account);
        assertEquals("productCode", result.orElse(null));
    }

    @Test
    public void testAccountManagerGetter() {
        DomainServices domainServices = Mockito.mock(DomainServices.class);
        OnLineBankingSession onLineBankingSession = Mockito.mock(OnLineBankingSession.class);
        CustomerManager customerManager = Mockito.mock(CustomerManager.class);
        AccountManager accountManager = Mockito.mock(AccountManager.class);
        Mockito.when(domainServices.getOnLineBankingSession()).thenReturn(onLineBankingSession);
        Mockito.when(onLineBankingSession.getCustomerManager()).thenReturn(customerManager);
        Mockito.when(customerManager.getAccountManager()).thenReturn(accountManager);

        Optional<AccountManager> result = ReliefCenterUtil.accountManagerGetter.apply(domainServices);
        assertTrue(result.isPresent());
    }

    @Test
    public void testBalanceAmountGetter() {
        Balance balance = Mockito.mock(Balance.class);
        Amount amount = Mockito.mock(Amount.class);
        Mockito.when(balance.getAmount()).thenReturn(amount);
        Mockito.when(amount.getAmount()).thenReturn(BigDecimal.TEN);

        Optional<BigDecimal> result = ReliefCenterUtil.balanceAmountGetter.apply(balance);
        assertEquals(BigDecimal.TEN, result.orElse(null));
    }

    @Test
    public void testCommonStartupContextGetter() {
        DomainServices domainServices = Mockito.mock(DomainServices.class);
        OnLineBankingServicingWebSession webSession = Mockito.mock(OnLineBankingServicingWebSession.class);
        CommonStartupContext commonStartupContext = Mockito.mock(CommonStartupContext.class);
        Mockito.when(domainServices.getOnlineBankingServicingWebSession()).thenReturn(webSession);
        Mockito.when(webSession.getCommonStartupContext()).thenReturn(commonStartupContext);

        Optional<CommonStartupContext> result = ReliefCenterUtil.commonStartupContextGetter.apply(domainServices);
        assertTrue(result.isPresent());
    }

    @Test
    public void testRetrieveQuestionSystemsErrorsGetter() {
        RetrieveQuestionsResponseTO responseTO = Mockito.mock(RetrieveQuestionsResponseTO.class);
        RetrieveQuestionsResponse response = Mockito.mock(RetrieveQuestionsResponse.class);
        SystemError systemError = Mockito.mock(SystemError.class);
        Mockito.when(responseTO.getResponse()).thenReturn(response);
        Mockito.when(response.getSystemErrors()).thenReturn(Collections.singletonList(systemError));

        Optional<List<SystemError>> result = ReliefCenterUtil.retrieveQuestionSystemsErrorsGetter.apply(responseTO);
        assertTrue(result.isPresent());
        assertEquals(1, result.get().size());
    }

    @Test
    public void testBuildCasmDelegateHeaderMap() {
        String unitOfWorkID = "unitOfWorkID";
        Map<String, String> headerMap = ReliefCenterUtil.buildCasmDelegateHeaderMap(unitOfWorkID);
        assertEquals(5, headerMap.size());
        assertTrue(headerMap.containsKey("WF_SENDERMESSAGEID_HEADER"));
        assertTrue(headerMap.containsKey("WF_CREATIONTIMESTAMP_HEADER"));
        assertTrue(headerMap.containsKey("WF_SENDERAPPLICATIONID_HEADER"));
        assertTrue(headerMap.containsKey("WF_SENDERHOSTNAME_HEADER_HEADER"));
        assertTrue(headerMap.containsKey("WF_SESSIONID_HEADER"));
    }
}
