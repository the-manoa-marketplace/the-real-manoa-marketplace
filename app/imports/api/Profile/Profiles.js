import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ProfilesCollection. It encapsulates state and variable values for profiles.
 */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String, // Combine first and last name into a single field
      address: String,
      image: {
        type: String,
        optional: true,
      },
      description: String,
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against the schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  /**
   * Inserts a profile into the collection, including the image upload logic.
   * @param {Object} profileData - Data for the profile.
   * @param {string} profileData.name - Full name.
   * @param {string} profileData.address - Address.
   * @param {string} profileData.description - Description.
   * @param {string} profileData.owner - Owner (e.g., email).
   * @param {string} imageFile - Image file data (e.g., from Cloudinary).
   */
  insertProfile(profileData, imageFile) {
    // Extract profile data from the form
    const { name, address, description, owner } = profileData;

    // Additional logic for image upload if an image is selected
    let image = '';
    if (imageFile) {
      image = imageFile; // Assuming imageFile is a valid URL or public ID from Cloudinary
    }

    // Insert the profile into the collection
    this.collection.insert({
      name,
      address,
      image,
      description,
      owner,
    });
  }
}

/**
 * The singleton instance of the ProfilesCollection.
 * @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();
