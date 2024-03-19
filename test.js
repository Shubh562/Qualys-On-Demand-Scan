

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
import javax.servlet.http.HttpSession;
import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class RetrieveQuestionRequestBuilderTest {

    @Mock
    private BusinessServiceWrapper businessServiceWrapper;
    
    @Mock
    private HttpSession session;
    
    private RetrieveQuestionRequestBuilder requestBuilder;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        requestBuilder = new RetrieveQuestionRequestBuilder();
        requestBuilder.setBusinessServiceWrapper(businessServiceWrapper);
    }

    @Test
    public void testPrepareRetrieveQuestionForQuestionnaireStartFlow() {
        // Mock data
        QuestionAndAnswerData currentQuestion = null;
        String accountId = "123456";

        // Mock behavior
        when(businessServiceWrapper.getDomainServices()).thenReturn(new DomainServices());
        when(session.getAttribute("CUSTOMER_LANGUAGE_CODE")).thenReturn("en");

        // Invoke the method
        RetrieveQuestionBodyRequest requestBody = requestBuilder.prepareRetrieveQuestionBodyRequest(session, currentQuestion, accountId);

        // Verify the result
        assertEquals("XCC", requestBody.getProductCode());
        assertEquals("en", requestBody.getPreferredLanguage());
        assertEquals("123456", requestBody.getUserSessionId());
        assertEquals(RetrieveQuestionRequestBuilder.CHANNEL_ID, requestBody.getChannel());
        assertEquals(RetrieveQuestionRequestBuilder.APPLICATION_ID, requestBody.getClientAppId());
        assertEquals(RetrieveQuestionRequestBuilder.DEFAULT_QUESTION_CODE, requestBody.getCurrentQuestionCode());
        assertEquals(List.of(RetrieveQuestionRequestBuilder.DEFAULT_ANSWER_CODE), requestBody.getCurrentChosenAnswerCodes());
    }

    @Test
    public void testPrepareRetrieveQuestionWithExistingQuestion() {
        // Mock data
        QuestionAndAnswerData currentQuestion = new QuestionAndAnswerData();
        currentQuestion.setQuestionCode("Q2");
        currentQuestion.setSelectedAnswer("A2");
        String accountId = "654321";

        // Mock behavior
        when(businessServiceWrapper.getDomainServices()).thenReturn(new DomainServices());
        when(session.getAttribute("CUSTOMER_LANGUAGE_CODE")).thenReturn("fr");

        // Invoke the method
        RetrieveQuestionBodyRequest requestBody = requestBuilder.prepareRetrieveQuestionBodyRequest(session, currentQuestion, accountId);

        // Verify the result
        assertEquals("XCC", requestBody.getProductCode());
        assertEquals("fr", requestBody.getPreferredLanguage());
        assertEquals("654321", requestBody.getUserSessionId());
        assertEquals(RetrieveQuestionRequestBuilder.CHANNEL_ID, requestBody.getChannel());
        assertEquals(RetrieveQuestionRequestBuilder.APPLICATION_ID, requestBody.getClientAppId());
        assertEquals("Q2", requestBody.getCurrentQuestionCode());
        assertEquals(List.of("A2"), requestBody.getCurrentChosenAnswerCodes());
    }
}
