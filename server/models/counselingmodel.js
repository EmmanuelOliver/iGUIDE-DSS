const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const counselingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  studentNo: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
   
  },
  results: {
    situations: {
      type: Map,
      of: {
        average: Number,
        priority: {
          type: String,
          enum: ['High Priority', 'Medium Priority', 'Low Priority'],
        },
      },
     
    },
    cbtItems: [
      {
        type: {
          type: String,
        
        },
        name: {
          type: String,
          
        },
        description: {
          type: String,
          enum: ['Mild Impact', 'Moderate Impact', 'Severe Impact'],
       
        },
        rating: {
          type: Number,
         
          min: 1,
          max: 5,
        },
      },
    ],
  },

  selectedActions: {
    type: Array,
  
  },
  selectedActivities: [
    {
      activity: {
        type: String,
     
      },
      status: {
        type: String,
     
      },
      selected: {
        type: Boolean,
       
      },
    },
  ],
  counselorNote: {
    type: String,
   
  },
  sessionStatus: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing',
  },
}, { timestamps: true });

module.exports = mongoose.model('CounselingSession', counselingSchema);


