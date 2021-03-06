import Ember from 'ember';

export default Ember.Component.extend({
  cat: null,
  isEditing: false,
  disableEdit: function(){
    return !this.get('canEdit');
  }.property('canEdit'),
  actions: {
    edit: function(){
      this.set('isEditing', true);
    },

   save: function(){
    this.get('cat').save();
    this.set('isEditing', false);
   }
  }
});
