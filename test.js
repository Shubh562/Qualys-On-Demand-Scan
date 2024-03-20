

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
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class RetrieveQuestionResponseBuilderTest {

    @Mock
    BusinessServiceWrapper businessServiceWrapperMock;

    @Mock
    HttpServletRequest requestMock;

    @InjectMocks
    RetrieveQuestionResponseBuilder responseBuilder;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithNonNullResponseAndData() {
        // Mocking response object with data
        RetrieveQuestionsResponseTO response = new RetrieveQuestionsResponseTO();
        response.setResponse(new ResponseData());
        List<QuestionData> questionDataList = new ArrayList<>();
        QuestionData questionData = new QuestionData();
        questionData.setQuestionCode("Q123");
        questionData.setQuestionDescription("Question Description");
        questionDataList.add(questionData);
        response.getResponse().setData(questionDataList);

        // Mocking behavior for businessServiceWrapper.getDomainServices()
        DomainServices domainServicesMock = mock(DomainServices.class);
        when(businessServiceWrapperMock.getDomainServices()).thenReturn(domainServicesMock);

        // Mocking behavior for setMinPaymentAmountForQuestion method
        when(domainServicesMock.getAccount(anyString())).thenReturn(new Account());

        // Call the method under test
        QuestionAndAnswerData questionAndAnswerData = responseBuilder.mapRetrieveQuestionResponseToQuestionData(requestMock, response, null, "123456");

        // Verify the expected behavior
        assertEquals("Q123", questionAndAnswerData.getQuestionCode());
        assertEquals("Question Description", questionAndAnswerData.getQuestionDescription());
        // Verify that setMinPaymentAmountForQuestion method was called
        verify(responseBuilder, times(1)).setMinPaymentAmountForQuestion(any(), eq("123456"));
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithNullResponse() {
        // Mocking behavior for businessServiceWrapper.getDomainServices()
        when(businessServiceWrapperMock.getDomainServices()).thenReturn(null);

        // Call the method under test with null response
        QuestionAndAnswerData questionAndAnswerData = responseBuilder.mapRetrieveQuestionResponseToQuestionData(requestMock, null, null, "123456");

        // Verify that null is returned
        assertEquals(null, questionAndAnswerData);
    }

    @Test
    public void testMapRetrieveQuestionResponseToQuestionData_WithEmptyResponse() {
        // Mocking response object with null response data
        RetrieveQuestionsResponseTO response = new RetrieveQuestionsResponseTO();
        response.setResponse(null);

        // Mocking behavior for businessServiceWrapper.getDomainServices()
        DomainServices domainServicesMock = mock(DomainServices.class);
        when(businessServiceWrapperMock.getDomainServices()).thenReturn(domainServicesMock);

        // Call the method under test with empty response
        QuestionAndAnswerData questionAndAnswerData = responseBuilder.mapRetrieveQuestionResponseToQuestionData(requestMock, response, null, "123456");

        // Verify that null is returned
        assertEquals(null, questionAndAnswerData);
    }
}
