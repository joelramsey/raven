'use strict';

const StaticDataHandler = (dataBlock) => {
  return (dataAttr) => {
    return (req, res) => {
      res.status(200).send(dataBlock[dataAttr]);
    }
  };
};

module.exports = StaticDataHandler;
