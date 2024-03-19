

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
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.api.mockito.PowerMockito;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.verify;
import java.util.Optional;
import java.util.function.Function;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.text.SimpleDateFormat;
import java.util.Date;
import static org.junit.Assert.assertEquals;

@RunWith(PowerMockRunner.class)
@PrepareForTest({UUID.class, SimpleDateFormat.class})
public class ReliefCenterUtilTest {

    @Mock
    private Account mockAccount;

    @Mock
    private AccountProfile mockAccountProfile;

    @Mock
    private AccountKey mockAccountKey;

    @Mock
    private AccountKeyGrpHogan mockAccountKeyGrpHogan;

    @Mock
    private HoganProductType mockHoganProductType;

    @Mock
    private Balance mockBalance;

    @Mock
    private DomainServices mockDomainServices;

    @Mock
    private OnLineBankingSession mockOnLineBankingSession;

    @Mock
    private CustomerManager mockCustomerManager;

    @Mock
    private CommonStartupContext mockCommonStartupContext;

    @Mock
    private OnLineBankingServicingWebSession mockOnLineBankingServicingWebSession;

    @Mock
    private RetrieveQuestionsResponseTO mockRetrieveQuestionsResponseTO;

    @Mock
    private RetrieveQuestionsResponse mockRetrieveQuestionsResponse;

    @Test
    public void testAccountKeyGrpHoganGetter() {
        when(mockAccount.getAccountProfile()).thenReturn(mockAccountProfile);
        when(mockAccountProfile.getAccountKey()).thenReturn(mockAccountKey);
        when(mockAccountKey.getAccountKeyGrpHogan()).thenReturn(mockAccountKeyGrpHogan);

        Optional<AccountKeyGrpHogan> expected = Optional.of(mockAccountKeyGrpHogan);
        Optional<AccountKeyGrpHogan> actual = ReliefCenterUtil.accountKeyGrpHoganGetter.apply(mockAccount);

        assertEquals(expected, actual);
    }

    @Test
    public void testHoganProductTypeGetter() {
        when(mockAccountKeyGrpHogan.getHoganProductType()).thenReturn(mockHoganProductType);

        Optional<HoganProductType> expected = Optional.of(mockHoganProductType);
        Optional<HoganProductType> actual = ReliefCenterUtil.hoganProductTypeGetter.apply(mockAccount);

        assertEquals(expected, actual);
    }

    @Test
    public void testHoganProductCodeGetter() {
        when(mockHoganProductType.getCode()).thenReturn("mockCode");

        Optional<String> expected = Optional.of("mockCode");
        Optional<String> actual = ReliefCenterUtil.hoganProductCodeGetter.apply(mockAccount);

        assertEquals(expected, actual);
    }

    @Test
    public void testAccountManagerGetter() {
        when(mockDomainServices.getOnLineBankingSession()).thenReturn(mockOnLineBankingSession);
        when(mockOnLineBankingSession.getCustomerManager()).thenReturn(mockCustomerManager);

        Optional<CustomerManager> expected = Optional.of(mockCustomerManager);
        Optional<CustomerManager> actual = ReliefCenterUtil.accountManagerGetter.apply(mockDomainServices);

        assertEquals(expected, actual);
    }

    @Test
    public void testBalanceAmountGetter() {
        BigDecimal expectedAmount = new BigDecimal("100.00");
        when(mockBalance.getAmount()).thenReturn(expectedAmount);

        Optional<BigDecimal> expected = Optional.of(expectedAmount);
        Optional<BigDecimal> actual = ReliefCenterUtil.balanceAmountGetter.apply(mockBalance);

        assertEquals(expected, actual);
    }

    @Test
    public void testCommonStartupContextGetter() {
        when(mockDomainServices.getOnlineBankingServicingWebSession()).thenReturn(mockOnLineBankingServicingWebSession);
        when(mockOnLineBankingServicingWebSession.getCommonStartupContext()).thenReturn(mockCommonStartupContext);

        Optional<CommonStartupContext> expected = Optional.of(mockCommonStartupContext);
        Optional<CommonStartupContext> actual = ReliefCenterUtil.commonStartupContextGetter.apply(mockDomainServices);

        assertEquals(expected, actual);
    }

    @Test
    public void testRetrieveQuestionSystemsErrorsGetter() {
        when(mockRetrieveQuestionsResponseTO.getResponse()).thenReturn(mockRetrieveQuestionsResponse);

        List<SystemError> expectedErrors = new ArrayList<>();
        expectedErrors.add(new SystemError());
        when(mockRetrieveQuestionsResponse.getSystemErrors()).thenReturn(expectedErrors);

        Optional<List<SystemError>> expected = Optional.of(expectedErrors);
        Optional<List<SystemError>> actual = ReliefCenterUtil.retrieveQuestionSystemsErrorsGetter.apply(mockRetrieveQuestionsResponseTO);

        assertEquals(expected, actual);
    }

    @Test
    public void testBuildCasmDelegateHeaderMap() throws Exception {
        PowerMockito.mockStatic(UUID.class);
        PowerMockito.when(UUID.randomUUID()).thenReturn(UUID.fromString("00000000-0000-0000-0000-000000000001"));

        PowerMockito.mockStatic(SimpleDateFormat.class);
        SimpleDateFormat mockDateFormat = PowerMockito.mock(SimpleDateFormat.class);
        whenNew(SimpleDateFormat.class).withArguments("YYYY-MM-dd'T' HH:mm:ss").thenReturn(mockDateFormat);
        when(mockDateFormat.format(any(Date.class))).thenReturn("2024-03-19T12:34:56");

        Map<String, String> expectedHeaderMap = new HashMap<>();
        expectedHeaderMap.put("WF_SENDERMESSAGEID_HEADER", "00000000-0000-0000-0000-000000000001");
        expectedHeaderMap.put("WF_CREATIONTIMESTAMP_HEADER", "2024-03-19T12:34:56");
        expectedHeaderMap.put("WF_SENDERAPPLICATIONID_HEADER", "WF_SENDERAPPLICATIONID");
        expectedHeaderMap.put("WF_SENDERHOSTNAME_HEADER_HEADER", "127.0.0.1");
        expectedHeaderMap.put("WF_SESSIONID_HEADER", "unitOfWorkID");
        expectedHeaderMap.put("CONTENT_TYPE_HEADER", "CONTENT_TYPE");

        Map<String, String> actualHeaderMap = ReliefCenterUtil.buildCasmDelegateHeaderMap("unitOfWorkID");

        assertEquals(expectedHeaderMap, actualHeaderMap);
    }

    // Add more tests for other methods as needed
}
