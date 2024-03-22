

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
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.HashMap;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class FinancialHardshipProcessorTest {

    @Mock
    private FinancialHardshipRequestBuilder requestBuilder;

    @Mock
    private FinancialHardshipService service;

    @InjectMocks
    private FinancialHardshipProcessor processor;

    @Test
    public void testProcessRetrieveQuestionnaireData_Success() throws EnhancedException {
        // Prepare test data
        RetrieveQuestionModel retrieveQuestionModel = new RetrieveQuestionModel();
        retrieveQuestionModel.setActivityO("SomeActivity");
        retrieveQuestionModel.setQuestionDataMap(new HashMap<>());

        // Stub method calls
        when(requestBuilder.prepareRetrieveQuestionRequest(retrieveQuestionModel))
                .thenReturn(new RetrieveQuestionRequest());
        when(service.retrieveQuestion(any(), any()))
                .thenReturn(new QuestionAndAnswerData());

        // Call the method under test
        FinancialHardshipData result = processor.processRetrieveQuestionnaireData(retrieveQuestionModel);

        // Verify the behavior
        assertNotNull(result);
        assertNotNull(result.getQuestionAndAnswer());
        assertTrue(result.getNavigationLink().size() > 0);
        verify(processor, times(1)).getNavigationLinks();
    }

    @Test
    public void testProcessRetrieveQuestionnaireData_Exception() throws EnhancedException {
        // Prepare test data
        RetrieveQuestionModel retrieveQuestionModel = new RetrieveQuestionModel();
        retrieveQuestionModel.setActivityO("SomeActivity");

        // Stub method calls to throw an exception
        when(requestBuilder.prepareRetrieveQuestionRequest(retrieveQuestionModel))
                .thenThrow(new EnhancedException("Error message"));

        // Call the method under test
        FinancialHardshipData result = processor.processRetrieveQuestionnaireData(retrieveQuestionModel);

        // Verify the behavior
        assertNotNull(result);
        assertNull(result.getQuestionAndAnswer());
        assertTrue(result.getNavigationLink().isEmpty());
        verify(processor, times(0)).getNavigationLinks(); // No invocation expected due to exception
    }

    @Test
    public void testGetFinancialHardship() {
        // Call the static method directly
        FinancialHardshipData result = FinancialHardshipProcessor.getFinancialHardship("SomeActivity");

        // Verify the behavior
        assertNotNull(result);
        assertEquals("", result.getType());
        assertNull(result.getCmsData());
    }
}
