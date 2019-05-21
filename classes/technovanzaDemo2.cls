public class technovanzaDemo2 {
	@AuraEnabled(cacheable=true)
    public static List<Contact> getContacts_Wire(String accId){
        return [Select Id,LastName,FirstName,Email from Contact where accountId=:accId];
    }
    @AuraEnabled
    public static List<Contact> getContacts_Imperative(String accId){
        return [Select Id,LastName,FirstName,Email from Contact where accountId=:accId];
    }
     @AuraEnabled
    public static void deleteSelectedRecords(List<Contact> lstRecords){
        system.debug('------'+lstRecords);
        delete lstRecords;
    }
}