import { LightningElement ,api, wire,track} from 'lwc';
import getContacts_Wire from '@salesforce/apex/TechnovanzaDemo2.getContacts_Wire';//referencing the apex class method
//import getContacts_Imperative from '@salesforce/apex/TechnovanzaDemo2.getContacts_Imperative';
import deleteSelectedRecords from '@salesforce/apex/TechnovanzaDemo2.deleteSelectedRecords';//referencing the apex class method
import {deleteRecord} from 'lightning/uiRecordApi';//referencing the uiRecordApi module 
import { refreshApex } from '@salesforce/apex';//referencing the apex module
const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];
//list of columns displaying on the data table.
const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email' , type: 'email'},
    {   type: 'action',
        typeAttributes: { rowActions: actions },
    },
];
export default class TechnovanzaDemo2 extends LightningElement {
    @api recordId;//get the recod id from the aura component. If you are putting this component then this variable will hold the value of the current record. It is equivalent to force:hasRecordId 
    @api sObjectName;
    @track contactLists=[];//hold the contact list
    @track errors=[];
    @track columns=columns;
    rowRecordId;//used in lightning-record-edit-form
    @track showEditScreen=false;
    _selectedRows=[];//local variable to hold the slected contacts
    @track title='Technovanza Demo';
    /*There are two ways to get the data from salesforce.1) wire service. 2.) Imperatively. 
    Wire Service- It is used only to get the data from salesforce. You can't use wire service to update the data. 
    Also,apex method must have cacheable=true. Use it hever possible since it sue the lightnign data service and hence it is fast.
    Imperatively- It can be used to get or update the data in the salesforce.
    */

    /*Wire Service   eslint-disable no-console */
    /* '$' make the variable reactive means if a reactive variable changes, the wire service provisions new data. */
    @wire(getContacts_Wire,{accId:'$recordId'})
    fncontactLists(value){
        this.refreshData=value;
        if(value.data){
            this.contactLists=value.data;
        }
        if(value.error){
           this.errors=value.error;
        }
        /*eslint-disable no-console */
        console.log('--record id--'+this.recordId);
        console.log('-----'+this.sObjectName);
    }
    //handle the row action like edit and edit.
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
       
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);//calling the delete method
                break;
            case 'edit':
                this.editDetails(row);//calling the edit method
                break;
            default:
        }
    }
    //show the record in the edit mode with the help of lightning-record-edit-form
    editDetails(row){
        this.rowRecordId=row.Id ;
        this.showEditScreen=true;
    }
    //delete the record form the system.Here we have used the lightning data service.
    deleteRow(row){
        deleteRecord(row.Id)
        .then(result=>{
            console.log('deleted record---'+result);
            //this is used to refresh the cache.Wire service work based on lightning data service and it store the cache
            //so we need to refresh the cache.
            return refreshApex(this.refreshData);
        })
        .catch(error=>{
            console.log('this is the error ---'+error);
        });
    }
    //handle whenever user click on the checkbox.
    handleRowSelection(event){
        this._selectedRows = event.detail.selectedRows;
    }
    //when user will click on the update method from edit form then this method will be called.
    handleSuccess(event){
        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord);
        this.showEditScreen=false;
       //this is used to refresh the cache.Wire service work based on lightning data service and it store the cache
       //so we need to refresh the cache.
        return refreshApex(this.refreshData);
    }
    // will be called when Mass Delete button will be clicked.Here are have used the imperative method and it is calling the apex method to delete the records.
    handleDeleteClick(){
        console.log(this._selectedRows);
        deleteSelectedRecords({lstRecords:this._selectedRows})
        .then(()=>{
            //this is used to refresh the cache.Wire service work based on lightning data service and it store the cache
            //so we need to refresh the cache.
            return refreshApex(this.refreshData);
        })
        .catch(error=>{
            console.log('--error occured--'+error);
        });
    }
    //this is handler of the event 'accordionselected'. accordionselected event is callled fom the child component 'technovanzaAccordion'.
    handleAccordionSelected(event){
        const eventObj=event.detail;
        if(eventObj.msg==='Accordion event fired' && (this.title).indexOf('Accordion')<=-1){
            this.title=this.title+' ('+eventObj.msg+')';
        }else{
            this.title='Technovanza Demo';
        }
        console.log(JSON.stringify(eventObj));
    }

     /*Imperative Method  need to be called inside the another methos like connectedcallback or button click*/

   /* connectedCallback(){
       this.getContactsFilterByAccId();
    }
    getContactsFilterByAccId(){
        getContacts_Imperative({accId:this.recordId} )
        .then(result=>{
           
            this.contactLists=result;
            console.log(result);
        })
        .catch(error=>{
           
            console.log(error);
        });
    }*/
}