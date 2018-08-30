import React from 'react';
import Item from 'widgets/game/list/itemV2/item.jsx';
import Helpers from 'widgets/game/list/itemV2/helpers.js';

export default (state) => {
  const options = state.options;
  const id = state.model.cid;
  const model = state.model.toJSON();
  model.friendlyUrlPrefix = `/game/${model.friendlyUrlName}`;

  const modelCategories = model.categories.map(category => {
    const categoryData = {
      name: category.name.replace(`-${window.config.siteCode}`, ''),
      priority: category.orderNumber
    };

    return categoryData;
  });

  if (modelCategories && options) {
    const category = options.category ? options.category.attributes.name : '';
    model.categories.currentCategory = category;
  }

  return (
    <Item
      id={id}
      {...model}
      options={options}
      model={state.model}
      playClickHandler={(e) => Helpers.playClickHandler(e, model, options.disableCategoryNavigate)}
      fullItemHandler={(e) => Helpers.fullItemHandler(e, model, options.disableCategoryNavigate)}
    />
  );
};
