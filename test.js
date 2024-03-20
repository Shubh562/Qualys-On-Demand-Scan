

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
import static org.mockito.ArgumentMatchers.any;
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
    public void testMapRetrieveQuestionResponseToQuestionData_WithNonNullResponse() {
        RetrieveQuestionsResponseTO responseTO = mock(RetrieveQuestionsResponseTO.class);
        RetrieveQuestionsResponseTO.ResponseData responseData = mock(RetrieveQuestionsResponseTO.ResponseData.class);
        QuestionData questionData = mock(QuestionData.class);

        when(responseTO.getResponse()).thenReturn(responseData);
        when(responseData.getData()).thenReturn(questionData);

        when(request.getAttribute("accountId")).thenReturn("123456");

        QuestionAndAnswerData parentQuestion = new QuestionAndAnswerData();
        QuestionAndAnswerData result = responseBuilder.mapRetrieveQuestionResponseToQuestionData(request, responseTO, parentQuestion, "123456");

        assertEquals(parentQuestion, result);
    }

    @Test
    public void testMapAndPreparePossibleAnswers() {
        com.wellsfargo.mwf.delegate.casm.retrievequestions.to.PossibleAnswers possibleAnswer = mock(com.wellsfargo.mwf.delegate.casm.retrievequestions.to.PossibleAnswers.class);
        when(possibleAnswer.getCode()).thenReturn("A");
        when(possibleAnswer.getDescription()).thenReturn("Option A");
        when(possibleAnswer.getSequence()).thenReturn(1);
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
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession()).thenReturn(mock(OnLineBankingSession.class));
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession().getCustomerManager()).thenReturn(mock(CustomerManager.class));
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession().getCustomerManager().getAccountManager()).thenReturn(mock(AccountManager.class));
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession().getCustomerManager().getAccountManager().getAccount(any())).thenReturn(null);

        responseBuilder.setMinPaymentAmountForQuestion(questionAndAnswerData, "123456");

        assertEquals(0.0, questionAndAnswerData.getMinPaymentAmount(), 0.0);
    }

    @Test
    public void testSetMinPaymentAmountForQuestion_WithNonNullAccount() {
        QuestionAndAnswerData questionAndAnswerData = new QuestionAndAnswerData();
        Account account = mock(Account.class);
        Balance balance = new Balance();
        balance.setAmount(100.0);

        when(businessServiceWrapper.getDomainServices()).thenReturn(new DomainServices());
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession()).thenReturn(mock(OnLineBankingSession.class));
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession().getCustomerManager()).thenReturn(mock(CustomerManager.class));
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession().getCustomerManager().getAccountManager()).thenReturn(mock(AccountManager.class));
        when(businessServiceWrapper.getDomainServices().getOnlineBankingSession().getCustomerManager().getAccountManager().getAccount(any())).thenReturn(account);
        when(account.getBalanceByType(any())).thenReturn(balance);

        responseBuilder.setMinPaymentAmountForQuestion(questionAndAnswerData, "123456");

        assertEquals(100.0, questionAndAnswerData.getMinPaymentAmount(), 0.0);
    }

    @Test
    public void testSetDisclosureForQuestion_WithNonBlankDisclosure() {
        QuestionAndAnswerData questionAndAnswerData = new QuestionAndAnswerData();
        questionAndAnswerData.setQuestionCode("code");

        when(request.getAttribute(any())).thenReturn("disclosure");

        responseBuilder.setDisclosureForQuestion(request, questionAndAnswerData);

        assertEquals("disclosure", questionAndAnswerData.getDisclosure());
    }

    @Test
    public void testSetDisclosureForQuestion_WithBlankDisclosure() {
        QuestionAndAnswerData questionAndAnswerData = new QuestionAndAnswerData();
        questionAndAnswerData.setQuestionCode("code");

        when(request.getAttribute(any())).thenReturn("");

        responseBuilder.setDisclosureForQuestion(request, questionAndAnswerData);

        assertEquals("", questionAndAnswerData.getDisclosure());
    }
}
