

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




@Test
    public void testMapAndPreparePossibleAnswers() {
        RetrieveQuestionResponseBuilder builder = new RetrieveQuestionResponseBuilder();

        List<com.wellsfargo.mwf.delegate.casm.retrievequestions.to.PossibleAnswers> inputList = new ArrayList<>();
        com.wellsfargo.mwf.delegate.casm.retrievequestions.to.PossibleAnswers answer1 = new com.wellsfargo.mwf.delegate.casm.retrievequestions.to.PossibleAnswers();
        answer1.setCode("A001");
        answer1.setDescription("Option 1");
        answer1.setSequence(1);
        inputList.add(answer1);

        List<PossibleAnswers> result = builder.mapAndPreparePossibleAnswers(inputList);

        assertEquals(1, result.size());
        assertEquals("A001", result.get(0).getCode());
        assertEquals("Option 1", result.get(0).getDescription());
        assertEquals(1, result.get(0).getSequence());
    }

    @Test
    public void testSetMinPaymentAmountForQuestion() {
        RetrieveQuestionResponseBuilder builder = new RetrieveQuestionResponseBuilder();

        DomainServices domainServices = mock(DomainServices.class);
        AccountManager accountManager = mock(AccountManager.class);
        OnlineBankingSession onlineBankingSession = mock(OnlineBankingSession.class);
        CustomerManager customerManager = mock(CustomerManager.class);
        Account account = mock(Account.class);

        when(businessServiceWrapper.getDomainServices()).thenReturn(domainServices);
        when(domainServices.getOnlineBankingSession()).thenReturn(onlineBankingSession);
        when(onlineBankingSession.getCustomerManager()).thenReturn(customerManager);
        when(customerManager.getAccountManager()).thenReturn(accountManager);
        when(accountManager.getAccountByNumber(anyString())).thenReturn(account);

        QuestionAndAnswerData questionAndAnswerData = new QuestionAndAnswerData();
        builder.setMinPaymentAmountForQuestion(questionAndAnswerData, "accountId");

        assertEquals(account, questionAndAnswerData.getAccount());
    }

    @Test
    public void testSetDisclosureForQuestion() {
        RetrieveQuestionResponseBuilder builder = new RetrieveQuestionResponseBuilder();

        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getParameter("language")).thenReturn("en");

        QuestionAndAnswerData questionAndAnswerData = new QuestionAndAnswerData();
        questionAndAnswerData.setQuestionCode("Q001");

        builder.setDisclosureForQuestion(request, questionAndAnswerData);

        assertEquals("Disclosure for Q001", questionAndAnswerData.getDisclosure());
    }
