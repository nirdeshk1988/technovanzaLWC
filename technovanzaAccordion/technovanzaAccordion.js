import { LightningElement,track } from 'lwc';

export default class TechnovanzaAccordion extends LightningElement {
    @track activeSections = [''];
   //will be called whenever user will click on the accordion.
    handleSectionToggle(event) {
        this.activeSections= event.detail.openSections;
        //firing the custom event named 'accordionselected'. This is web Comonent specific guide line means salesforce use the OOB cusotm event to 
        // communicate between child to parent.https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail
        const selectEvent=new CustomEvent('accordionselected',{
            bubbles:true,
            detail:{
                selectedSection:this.activeSections,
                msg:'Accordion event fired'
            }
        });
        this.dispatchEvent(selectEvent);
    }
   
}