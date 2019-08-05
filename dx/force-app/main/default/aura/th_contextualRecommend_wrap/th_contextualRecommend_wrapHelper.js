/*global $A */
({
  /**
   * Initialize the component
   **/
  initializeComponent : function(component, helper) {
    helper.noop();
  },

  /**
   * Handles when a user requests adding a trailhead assignment
   */
  handleShareTrailheadRequest : function(component, event, helper){
    var modalBody;
    var overlayLib = component.find('contextualRecommendOverlayLib');

    var recordId = null;
    var eventParams = event.getParams();

    if (typeof eventParams.entryId !== 'undefined'){
      recordId = eventParams.entryId;
    }

    $A.createComponent('c:th_overlayShare_wrap',
      {
        recordId: recordId
      },
      function(content, status){
        if (status === 'SUCCESS'){
          modalBody = content;
          overlayLib.showCustomModal({
            header: 'EXAMPLE HEADER',
            body: modalBody,
            showCloseButton: true,
            closeCallback: function(){
              console.log('you closed the add assignment modal. captured from wrapper.'); // eslint-disable-line no-console
            }
          });
        }
      }
    );
  },

  
  
  /**
   * Displays an error
   * @param errorTitle (String)
   * @param errorMsg (String)
   **/
  displayError: function(errorType, errorCode){
    var errorTitle = errorType?errorType:'Error';
    var errorMsg = 'An error occurred: ' + errorCode + '. Please contact your System Administrator';
    
    //-- send a toast message
    var resultsToast = $A.get('e.force:showToast');
    resultsToast.setParams({
      'title': errorTitle,
      'message': errorMsg
    });
    resultsToast.fire();
  },
  
  log : function(msg){console.log.apply(this, arguments);}, // eslint-disable-line
  warn : function(msg){console.warn.apply(this, arguments);}, // eslint-disable-line
  error : function(msg){console.error.apply(this, arguments);}, // eslint-disable-line
  noop : function(){}
});