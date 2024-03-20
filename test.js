

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
import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class RetrieveQuestionResponseBuilderTest {

    @Mock
    HttpServletRequest request;

    @Mock
    BusinessServiceWrapper businessServiceWrapper;

    RetrieveQuestionResponseBuilder responseBuilder;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        responseBuilder = new RetrieveQuestionResponseBuilder();
        responseBuilder.setBusinessServiceWrapper(businessServiceWrapper);
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithNullResponse() {
        QuestionAndAnswerData parentQuestion = new QuestionAndAnswerData();
        QuestionAndAnswerData result = responseBuilder.mapRetrieveQuestionResponseToQuestionData(request, null, parentQuestion, "123456");

        assertEquals(parentQuestion, result);
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithNonNullResponse() {
        RetrieveQuestionsResponseTO responseTO = new RetrieveQuestionsResponseTO();
        RetrieveQuestionsResponseTO.ResponseData responseData = new RetrieveQuestionsResponseTO.ResponseData();
        responseData.setData(new QuestionData());
        responseTO.setResponse(responseData);

        when(request.getAttribute("accountId")).thenReturn("123456");

        QuestionAndAnswerData parentQuestion = new QuestionAndAnswerData();
        QuestionAndAnswerData result = responseBuilder.mapRetrieveQuestionResponseToQuestionData(request, responseTO, parentQuestion, "123456");

        assertEquals(parentQuestion, result);
    }

    @Test
    public void testMapAndPreparePossibleAnswers() {
        com.wellsfargo.mwf.delegate.casm.retrievequestions.to.PossibleAnswers possibleAnswer = new com.wellsfargo.mwf.delegate.casm.retrievequestions.to.PossibleAnswers();
        possibleAnswer.setCode("A");
        possibleAnswer.setDescription("Option A");
        possibleAnswer.setSequence(1);
        List<com.wellsfargo.mwf.delegate.casm.retrievequestions.to.PossibleAnswers> possibleAnswers = Collections.singletonList(possibleAnswer);

        List<PossibleAnswers> result = responseBuilder.mapAndPreparePossibleAnswers(possibleAnswers);

        assertEquals(1, result.size());
        assertEquals("A", result.get(0).getCode());
        assertEquals("Option A", result.get(0).getDescription());
        assertEquals(1, result.get(0).getSequence());
    }

    @Test
    public void testSetMinPaymentAmountForQuestion_WithNullAccount() {
        QuestionAndAnswerData questionAndAnswerData = new QuestionAndAnswerData();

        when(businessServiceWrapper.getDomainServices()).thenReturn(new DomainServices());
        when(businessServiceWrapper.getDomainServices().getAccount(anyString())).thenReturn(null);

        responseBuilder.setMinPaymentAmountForQuestion(questionAndAnswerData, "123456");

        assertEquals(0.0, questionAndAnswerData.getMinPaymentAmount(), 0.0);
    }

    @Test
    public void testSetMinPaymentAmountForQuestion_WithNonNullAccount() {
        QuestionAndAnswerData questionAndAnswerData = new QuestionAndAnswerData();
        Account account = mock(Account.class);
        Balance balance = new Balance();
        balance.setAmount(100.0);
        when(account.getBalanceByType(any())).thenReturn(balance);

        when(businessServiceWrapper.getDomainServices()).thenReturn(new DomainServices());
        when(businessServiceWrapper.getDomainServices().getAccount(anyString())).thenReturn(account);

        responseBuilder.setMinPaymentAmountForQuestion(questionAndAnswerData, "123456");

        assertEquals(100.0, questionAndAnswerData.getMinPaymentAmount(), 0.0);
    }

    @Test
    public void testSetDisclosureForQuestion_WithBlankDisclosure() {
        QuestionAndAnswerData questionAndAnswerData = new QuestionAndAnswerData();
        questionAndAnswerData.setQuestionCode("code");

        when(request.getAttribute(anyString())).thenReturn("");

        responseBuilder.setDisclosureForQuestion(request, questionAndAnswerData);

        assertEquals("", questionAndAnswerData.getDisclosure());
    }

    @Test
    public void testSetDisclosureForQuestion_WithNonBlankDisclosure() {
        QuestionAndAnswerData questionAndAnswerData = new QuestionAndAnswerData();
        questionAndAnswerData.setQuestionCode("code");

        when(request.getAttribute(anyString())).thenReturn("disclosure");

        responseBuilder.setDisclosureForQuestion(request, questionAndAnswerData);

        assertEquals("disclosure", questionAndAnswerData.getDisclosure());
    }
}
