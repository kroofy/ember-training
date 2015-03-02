import DS from 'ember-data';
import Ember from 'ember';

export default DS.Adapter.extend({
  find: function(store, type, id) {
    return Ember.$.get('/api/cats/' + id).then( (cat) => {
      cat.ownerName = cat.owner_name;
      return cat;
   });
  },

  findAll: function() {
    return Ember.$.get('/api/cats').then( (cats) => {
       return cats.map( (cat) => {
          cat.ownerName = cat.owner_name;
          return cat;
        });
     });
  },

  updateRecord: function(store, type, record) {
    return Ember.$.ajax({
      type: 'put',
      url: '/api/cats/' + record.get('id'),
      data: JSON.stringify({
        id: record.get('id'),
        name: record.get('name'),
        owner_name: record.get('ownerName'),
        image: record.get('image'),
      }),
      contentType: 'application/json',
      processData: false
   });
  },
  createRecord: function(store, type, record) {
    return Ember.$.ajax({
      type: 'post',
      url: '/api/cats/',
      data: JSON.stringify({
        name: record.get('name'),
        owner_name: record.get('ownerName'),
        image: record.get('image'),
      }),
      contentType: 'application/json',
      processData: false
   });
  }
});
