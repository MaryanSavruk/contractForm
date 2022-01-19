function generateContracts() {

  const contractorSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contract");
    //enter whatever you name your sheet here.
  const contractData = contractorSheet.getDataRange().getDisplayValues();
  Logger.log(contractData)
  const contractTemplate = DriveApp.getFileById("1Sf0c2bAmGNR46HrLv5IW-CXEsCSqwGdPhBe6myJpINU");
  const contractFolder = DriveApp.getFolderById("1OxOy13ddcWNcH83uLncoIxsw7WQBA-2c");
  // let contractDate = new Date();
  // const filePrefix = contractDate.getFullYear() + "-" + String(contractDate.getMonth());


  let contractDate = '';

  for (let i = 0; i < contractData.length; i++) {
    if (contractData[i][0] == "Y") {
      contractDate = contractData[i][1];
      let myDoc = contractTemplate.makeCopy(contractData[i][2]  + contractData[i][1]);
      let newDoc = DocumentApp.openById(myDoc.getId());

      let docBody = newDoc.getBody();
      docBody.replaceText("client-data", contractData[i][2]);
      docBody.replaceText("passport-series", contractData[i][3]);
      docBody.replaceText("passport-info", contractData[i][4]);
      docBody.replaceText("ipn", contractData[i][5]);
      docBody.replaceText("phone", contractData[i][7]);
      docBody.replaceText("passport-number", contractData[i][8]);
      docBody.replaceText("passport-date", contractData[i][9]);
      docBody.replaceText("clien-registration", contractData[i][10]);
      docBody.replaceText("date", contractDate);

      newDoc.saveAndClose();
      myDoc.moveTo(contractFolder);
      // let docPdf = myDoc.getAs('application/pdf');
      // contractFolder.createFile(docPdf).setName(filePrefix + contractData[i][1] + ".pdf");
    }

  }

}
