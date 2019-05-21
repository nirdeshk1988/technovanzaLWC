class counter extends HTMLElement{
    constructor(){
      //it is mandatory to call the super method else it will give error.
      super();
      const shadowDOMRoot=this.attachShadow({mode:"open"});   //Attaching the shadow dom. 
      //The getAttribute() method returns the value of the attribute with the specified name, of an element.
      //it is standard javascript method    
      this.counterValue=this.getAttribute("start");       
      this.incrementCounter();  //calling the increment method.
    }
    //
    incrementCounter(){
      // every 1000 miliseconds setInterval method will increase the value of counterValue varaible.
      this.timeOut= setInterval(()=>
        {
            this.counterValue=Number(this.counterValue)+1;
        }
        ,1000);
        console.log('value changed');
    }
    //this is the web standard method. It is used to track the attribute changes and called the method attributeChangedCallback.
    //by returning the array of attribute we can check if attribute value got changed or not and then perform the action.
    static get observedAttributes(){
        return ['start'];
    }
   //this method got called whenever attribute mentioned in the onservedAttributes got changed.
    attributeChangedCallback(name, oldVlaue,newValue){
      const innerHTMLValue=`<h2 >The counter value is : ${this.counterValue} </h2>`;
      this.shadowRoot.innerHTML=innerHTMLValue;//attaching the value to the shadow dom
     // this.innerHTML=innerHTMLValue;
      if(this.counterValue>=10){
        clearInterval(this.timeOut);
      }
    }
    //getter of the variable counterValue. This getter will be called whenever we will display the value like this.counterValue
    get counterValue(){
        console.log('getter');
        var startValue=this.getAttribute('start');
        return startValue;
    }
    //setter of variable counterValue. This setter will be called whenever we will set the value like this.counter=6;
    set counterValue(val){
        console.log('---setter--');
        this.setAttribute('start',val);
    }
}
customElements.define("counter-webcomponent",counter);//this method id used to register the custom element on the page.
//we need to pass the two parameters 1.) Name and it should contian the dash - 2.) class name which hold the defination of the cusotm element.
/**
 ALERT- Salesforce does the heavy lifting for us in LWC. We don't need to attach the shadow DOM, salesforce does for us.
 We also don't need to use the customElements.define method, salesforce does for us.
 Also, we don't need to use the observedAttributes ,attributeChangedCallback method. Instead fire the method when value got changed 
 e.g 
@api myVar;

get myVar(){
    return this._myVar;
}
set myVar(value){
    this._myVar=value;
    //Whatever logic o method to execute
}
 */