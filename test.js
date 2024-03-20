

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





import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import javax.servlet.http.HttpSession;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class RetrieveQuestionRequestBuilderTest {

    @Mock
    BusinessServiceWrapper businessServiceWrapperMock;

    @Mock
    HttpSession sessionMock;

    @Test
    public void testPrepareRetrievequestionBodyRequest_WithNonNullCurrentQuestion() {
        // Mock dependencies
        RetrieveQuestionRequestBuilder builder = new RetrieveQuestionRequestBuilder();
        builder.setBusinessServiceWrapper(businessServiceWrapperMock);
        
        // Mock behavior for businessServiceWrapper.getDomainServices()
        DomainServices domainServicesMock = Mockito.mock(DomainServices.class);
        Mockito.when(businessServiceWrapperMock.getDomainServices()).thenReturn(domainServicesMock);
        
        // Mock session attributes
        Mockito.when(sessionMock.getAttribute("CUSTOMER_LANGUAGE_CODE")).thenReturn("en-US");

        // Create a dummy question and answer data
        QuestionAndAnswerData currentQuestion = new QuestionAndAnswerData();
        currentQuestion.setQuestionCode("Q123");
        currentQuestion.setSelectedAnswer("A456");

        // Call the method under test
        RetrieveQuestionBodyRequest requestBody = builder.prepareRetrievequestionBodyRequest(sessionMock, currentQuestion, "123456");

        // Assert the expected values in the requestBody
        assertEquals("123456", requestBody.getUserSessionId());
        assertEquals("en-US", requestBody.getPreferredLanguage());
        assertEquals("XCC", requestBody.getProductCode());
        assertEquals("Q123", requestBody.getCurrentQuestionCode());
        assertEquals(1, requestBody.getCurrentChosenAnswerCodes().size());
        assertEquals("A456", requestBody.getCurrentChosenAnswerCodes().get(0));
    }

    @Test
    public void testPrepareRetrievequestionBodyRequest_WithNullCurrentQuestion() {
        // Mock dependencies
        RetrieveQuestionRequestBuilder builder = new RetrieveQuestionRequestBuilder();
        builder.setBusinessServiceWrapper(businessServiceWrapperMock);
        
        // Mock behavior for businessServiceWrapper.getDomainServices()
        DomainServices domainServicesMock = Mockito.mock(DomainServices.class);
        Mockito.when(businessServiceWrapperMock.getDomainServices()).thenReturn(domainServicesMock);
        
        // Mock session attributes
        Mockito.when(sessionMock.getAttribute("CUSTOMER_LANGUAGE_CODE")).thenReturn("en-US");

        // Call the method under test with null current question
        RetrieveQuestionBodyRequest requestBody = builder.prepareRetrievequestionBodyRequest(sessionMock, null, "123456");

        // Assert the expected values in the requestBody for default case
        assertEquals("123456", requestBody.getUserSessionId());
        assertEquals("en-US", requestBody.getPreferredLanguage());
        assertEquals("XCC", requestBody.getProductCode());
        assertEquals("DEFAULT_QUESTION_CODE", requestBody.getCurrentQuestionCode());
        assertEquals(1, requestBody.getCurrentChosenAnswerCodes().size());
        assertEquals("DEFAULT_ANSWER_CODE", requestBody.getCurrentChosenAnswerCodes().get(0));
    }
}
