//import pnp from 'sp-pnp-js';


// //Ignore success and error properties and instead implement them as the following after the }) so that we can inform the front-end service of that status and value of the API call.
// .then(function onSuccess(result) {
//             var response.success = true;
//             //Set result to a new business object that you have defined filling here only the properties needed.
//             var businessObjectName = new BusinessObjectName();
// //Do stuff and fill in the businessObjectName’s properties needed.
// response.businessObjectName = businessObjectName;
//             resolve(response);
// })
// .catch(function onError(reason) {
//             var response.message = reason;
//             response.success = false;
//             //log TBD
//             reject(response);
// });



const siteUrl = "https://magenic365.sharepoint.com/sites/PatrickL/POC/_api/web/lists/getbytitle('Documents')" ;
modules.export = {
   getIssues: retrieveListItems(siteUrl) {
      var clientContext = new SP.ClientContext(siteUrl);
      var oList = clientContext.get_web().get_lists().getByTitle('Announcements');

      var camlQuery = new SP.CamlQuery();
      camlQuery.set_viewXml(
          '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
          '<Value Type=\'Number\'>1</Value></Geq></Where></Query>' +
          '<RowLimit>10</RowLimit></View>'
      );
      this.collListItem = oList.getItems(camlQuery);

      clientContext.load(collListItem);
      clientContext.executeQueryAsync(
          Function.createDelegate(this, this.onQuerySucceeded),
          Function.createDelegate(this, this.onQueryFailed)
      );
  }

  function onQuerySucceeded(sender, args) {
      var listItemInfo = '';
      var listItemEnumerator = collListItem.getEnumerator();

      while (listItemEnumerator.moveNext()) {
          var oListItem = listItemEnumerator.get_current();
          listItemInfo += '\nID: ' + oListItem.get_id() +
              '\nTitle: ' + oListItem.get_item('Title') +
              '\nBody: ' + oListItem.get_item('Body');
      }

      alert(listItemInfo.toString());
  }

  function onQueryFailed(sender, args) {
      alert('Request failed. ' + args.get_message() +
          '\n' + args.get_stackTrace());
  }

}
