

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




import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Optional;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class RetrieveQuestionResponseBuilderTest {

    @Mock
    HttpServletRequest request;

    @Mock
    BusinessServiceWrapper businessServiceWrapper;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithNullResponse() {
        RetrieveQuestionResponseBuilder responseBuilder = new RetrieveQuestionResponseBuilder();

        QuestionAndAnswerData result = responseBuilder.mapRetrieveQuestionResponseToQuestionData(request, null, null, "123456");

        assertEquals(new QuestionAndAnswerData(), result);
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithNonNullResponse() {
        RetrieveQuestionResponseBuilder responseBuilder = new RetrieveQuestionResponseBuilder();
        RetrieveQuestionsResponseTO responseTO = new RetrieveQuestionsResponseTO();
        RetrieveQuestionsResponseTO.ResponseData responseData = new RetrieveQuestionsResponseTO.ResponseData();
        responseData.setData(new QuestionData());
        responseTO.setResponse(responseData);

        when(request.getAttribute("accountId")).thenReturn("123456");

        QuestionAndAnswerData result = responseBuilder.mapRetrieveQuestionResponseToQuestionData(request, responseTO, null, "123456");

        assertEquals(new QuestionAndAnswerData(), result);
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithNonNullData() {
        RetrieveQuestionResponseBuilder responseBuilder = new RetrieveQuestionResponseBuilder();
        RetrieveQuestionsResponseTO responseTO = new RetrieveQuestionsResponseTO();
        RetrieveQuestionsResponseTO.ResponseData responseData = new RetrieveQuestionsResponseTO.ResponseData();
        QuestionData questionData = new QuestionData();
        questionData.setQuestionCode("Q001");
        questionData.setQuestionDescription("Description");
        responseData.setData(questionData);
        responseTO.setResponse(responseData);

        QuestionAndAnswerData expected = new QuestionAndAnswerData();
        expected.setQuestionCode("Q001");
        expected.setQuestionDescription("Description");

        QuestionAndAnswerData result = responseBuilder.mapRetrieveQuestionResponseToQuestionData(request, responseTO, null, "123456");

        assertEquals(expected, result);
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithPossibleAnswers() {
        RetrieveQuestionResponseBuilder responseBuilder = new RetrieveQuestionResponseBuilder();
        RetrieveQuestionsResponseTO responseTO = new RetrieveQuestionsResponseTO();
        RetrieveQuestionsResponseTO.ResponseData responseData = new RetrieveQuestionsResponseTO.ResponseData();
        QuestionData questionData = new QuestionData();
        questionData.setPossibleAnswers(Collections.singletonList(new com.wellsfargo.mwf.delegate.casm.retrievequestions.to.PossibleAnswers()));
        responseData.setData(questionData);
        responseTO.setResponse(responseData);

        QuestionAndAnswerData result = responseBuilder.mapRetrieveQuestionResponseToQuestionData(request, responseTO, null, "123456");

        assertEquals(1, result.getPossibleAnswers().size());
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithMinPaymentAmount() {
        RetrieveQuestionResponseBuilder responseBuilder = new RetrieveQuestionResponseBuilder();
        RetrieveQuestionsResponseTO responseTO = new RetrieveQuestionsResponseTO();
        RetrieveQuestionsResponseTO.ResponseData responseData = new RetrieveQuestionsResponseTO.ResponseData();
        QuestionData questionData = new QuestionData();
        questionData.setQuestionCode("Q002");
        responseData.setData(questionData);
        responseTO.setResponse(responseData);

        when(businessServiceWrapper.getDomainServices()).thenReturn(new DomainServices());
        Account account = mock(Account.class);
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession()).thenReturn(mock(OnLineBankingSession.class));
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession().getCustomerManager()).thenReturn(mock(CustomerManager.class));
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession().getCustomerManager().getAccountManager()).thenReturn(mock(AccountManager.class));
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession().getCustomerManager().getAccountManager().getAccount(anyString())).thenReturn(account);

        Balance balance = new Balance();
        balance.setAmount(100.0);
        when(account.getBalanceByType(any())).thenReturn(balance);

        QuestionAndAnswerData result = responseBuilder.mapRetrieveQuestionResponseToQuestionData(request, responseTO, null, "123456");

        assertEquals("100.0", result.getMinPaymentAmount());
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithDisclosure() {
        RetrieveQuestionResponseBuilder responseBuilder = new RetrieveQuestionResponseBuilder();
        RetrieveQuestionsResponseTO responseTO = new RetrieveQuestionsResponseTO();
        RetrieveQuestionsResponseTO.ResponseData responseData = new RetrieveQuestionsResponseTO.ResponseData();
        QuestionData questionData = new QuestionData();
        questionData.setQuestionCode("Q003");
        responseData.setData(questionData);
        responseTO.setResponse(responseData);

        when(request.getAttribute(anyString())).thenReturn("disclosure");

        QuestionAndAnswerData result = responseBuilder.mapRetrieveQuestionResponseToQuestionData(request, responseTO, null, "123456");

        assertEquals("disclosure", result.getDisclosure());
    }
}
