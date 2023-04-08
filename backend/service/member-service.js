const Member = require('../models/Member');
const { uid } = require('uid');
const mongoose = require('mongoose');

// Using for testing purpose: replace with familyId and
// creating helper function for creating kids members
const createMembers = async (kidsList, family) => {
  // console.log('HELP', family);
  // give us an array of names
  // validation: filter out any empty strings or strings with less than 3 characters
  try {
    // in order not to save empty kids entries in db
    if (kidsList) {
      const kidNames = kidsList
        .map((kid) => kid.kidName.trim())
        .filter((kidName) => kidName.length > 0 && kidName.length >= 3);

      if (kidNames.length !== kidsList.length) {
        console.error('Invalid kid name(s) detected');
      }
      // after removing empty spaces and empty entries we save kids in db  
      const kidMembers = kidNames.map(
        (kid) =>
          new Member({
            firstName: kid,
            family,
          }),
      );
      await Member.insertMany(kidMembers);
    }
  } catch (err) {
    console.log(err);
  }
};

const memberRegistration = async ({
  firstName,
  lastName,
  kidsList,
  inviteeEmail,
  principle,
  family,
  role
}) => {
  // use helper function on array kidNames to create kid members
  await createMembers(kidsList, family);

  const principleMemberInfo = new Member({
    firstName,
    lastName,
    principle,
    inviteeEmail,
    family,
    role // role is a parent
  });
  console.log('m1', principleMemberInfo);
  await principleMemberInfo.save();
};

// check!!
const isDuplicate = async (firstName, lastName, kidsList) => {
  const checkDuplicate = await Member.findOne({
    firstName,
    lastName,
    kidsList,
  });
  // console.log('isDuplicate', checkDuplicate);
  return checkDuplicate ? true : false;
};

const uploadMemeberImage = async (memberId, image) => {
  try {
    const specifiedMember = await Member.findById(memberId);
    if (!specifiedMember) {
      return { success: false, message: 'Member not found' };
    }

    if (!image) {
      return { success: false, message: 'No image uploaded' };
    } else if (!image.mimetype.includes('image/png') && !image.mimetype.includes('image/jpeg') && !image.mimetype.includes('image/jpg')) {
      return { success: false, message: 'Invalid image type. Please use .png, .jpeg, .jpg' };
    } else if (image.size > 1000000) {
      return { success: false, message: 'Invalid image size' };
    }
    // generate a unique filename for the image
    const { mimetype, buffer } = image;
    const fileName = `${uid()}.${mimetype.split('/')[1]}`;

    specifiedMember.avatar = {
      name: fileName,
      contentType: mimetype,
      data: buffer
    }

    await specifiedMember.save();
    return { success: true, message: 'Image uploaded successfully', specifiedMember };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Something went wrong', error };
  }
}

const updateMemeberImage = async (memberId, image) => {
  try {
    const specifiedMember = await Member.findById(memberId);
    if (!specifiedMember) {
      return { success: false, message: 'Member not found' };
    }

    if (!image) {
      return { success: false, message: 'No image uploaded' };
    } else if (!image.mimetype.includes('image/png') && !image.mimetype.includes('image/jpeg') && !image.mimetype.includes('image/jpg')) {
      return { success: false, message: 'Invalid image type. Please use .png, .jpeg, .jpg' };
    } else if (image.size > 1000000) {
      return { success: false, message: 'Invalid image size' };
    }

    const { mimetype, buffer } = image;
    const fileName = `${uid()}.${mimetype.split('/')[1]}`;
    console.log(fileName)

    const updatedMember = await Member.findOneAndUpdate(
      { _id: memberId },
      {

        avatar: {
          name: fileName,
          contentType: mimetype,
          data: buffer,
        }
      },
      { new: true }
    );

    return { success: true, message: 'Image updated successfully', updatedMember };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Something went wrong', error };
  }
}

module.exports = { memberRegistration, isDuplicate, uploadMemeberImage, updateMemeberImage };
