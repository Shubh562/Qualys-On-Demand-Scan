

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



import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RetrieveQuestionServiceTest {

    @Mock
    DelegateRetryExecutionTemplate delegateRetryExecutionTemplate;

    @Mock
    Delegate<RetrieveQuestionsRequestTO, RetrieveQuestionsResponseTO> retrieveQuestionDelegate;

    @InjectMocks
    RetrieveQuestionService retrieveQuestionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRetrieveQuestion_Success() throws EnhancedException {
        // Prepare test data
        RetrieveQuestionBodyRequest request = new RetrieveQuestionBodyRequest();
        Map<String, String> headerMap = new HashMap<>();

        // Mock dependencies behavior
        RetrieveQuestionsResponseTO response = new RetrieveQuestionsResponseTO();
        when(delegateRetryExecutionTemplate.execute(any(), any())).thenReturn(response);

        // Invoke the method under test
        RetrieveQuestionsResponseTO result = retrieveQuestionService.retrieveQuestion(request, headerMap);

        // Verify the result
        assertNotNull(result);
        // Add more assertions based on the actual implementation
    }

    @Test
    public void testRetrieveQuestion_ExceptionThrown() throws EnhancedException {
        // Prepare test data
        RetrieveQuestionBodyRequest request = new RetrieveQuestionBodyRequest();
        Map<String, String> headerMap = new HashMap<>();

        // Mock dependencies behavior
        when(delegateRetryExecutionTemplate.execute(any(), any())).thenThrow(new EnhancedException("Error"));

        // Verify that the method under test throws an EnhancedException
        assertThrows(EnhancedException.class, () -> retrieveQuestionService.retrieveQuestion(request, headerMap));
    }

    @Test
    public void testCreateRetrieveQuestionRequest() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, EnhancedException {
        // Prepare test data
        RetrieveQuestionBodyRequest request = new RetrieveQuestionBodyRequest();
        Map<String, String> headerMap = new HashMap<>();

        // Invoke the private method under test using reflection
        Method method = RetrieveQuestionService.class.getDeclaredMethod("createRetrieveQuestionRequest", RetrieveQuestionBodyRequest.class, Map.class);
        method.setAccessible(true);
        RetrieveQuestionsRequestTO result = (RetrieveQuestionsRequestTO) method.invoke(retrieveQuestionService, request, headerMap);

        // Verify the result
        assertNotNull(result);
        assertEquals("{}", result.getRawRequest());
        assertEquals(headerMap, result.getHeaderMap());
        assertEquals(ReliefCenterAPIConstants.RETRIEVE_QUESTION_DELEGATE_URI, result.getRequestURI());
    }

    @Test
    public void testGetExecutionParameters() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        // Invoke the private method under test using reflection
        Method method = RetrieveQuestionService.class.getDeclaredMethod("getExecutionParameters", String.class);
        method.setAccessible(true);
        ExecutionParameters result = (ExecutionParameters) method.invoke(retrieveQuestionService, "sessionId");

        // Verify the result
        assertNotNull(result);
        assertEquals(System.getProperty(ReliefCenterAPIConstants.CLIENTSERVICEID), result.getClientServiceId());
        assertEquals("sessionId", result.getSessionId());
    }

    @Test
    public void testValidateResponse_NullResponse() throws EnhancedException {
        // Prepare test data
        RetrieveQuestionsResponseTO response = null;

        // Verify that the method under test throws an EnhancedException
        assertThrows(EnhancedException.class, () -> retrieveQuestionService.validateResponse(response));
    }

    @Test
    public void testValidateResponse_WithSystemErrors() {
        // Prepare test data
        RetrieveQuestionsResponseTO response = new RetrieveQuestionsResponseTO();
        RetrieveQuestionsResponse responseDetail = new RetrieveQuestionsResponse();
        responseDetail.setSystemErrors(Collections.singletonList(new SystemError()));
        response.setResponse(responseDetail);

        // Verify that the method under test throws an EnhancedException
        assertThrows(EnhancedException.class, () -> retrieveQuestionService.validateResponse(response));
    }

    @Test
    public void testRetrieveQuenitonExecutionMethod() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        // Prepare test data
        RetrieveQuestionBodyRequest retrieveQuestionRequest = new RetrieveQuestionBodyRequest();
        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("key", "value");

        // Invoke the private method under test using reflection
        Method method = RetrieveQuestionService.class.getDeclaredMethod("retrieveQuenitonExecutionMethod", RetrieveQuestionBodyRequest.class, Map.class);
        method.setAccessible(true);
        Object result = method.invoke(retrieveQuestionService, retrieveQuestionRequest, headerMap);

        // Verify the result
        assertNotNull(result);
        assertTrue(result instanceof ExecutionFunction);
    }
}
