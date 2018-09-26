import React from 'react';
import ActionButton from 'widgets/user/promotionsv2/item/action-button.jsx';
import { Currency, Translator } from 'orchestra';

// generateDescription - reduces the short description to 250 chars to prevent large promo tiles
const generateDescription = (description, useFullText) => {
  let shortDesc = description;
  if (!useFullText && description.length > 250) {
    shortDesc = `${description.substring(0, 250)}...`;
  }
  return { __html: shortDesc };
};

const getDescription = description => (
  <p className="promo-description" dangerouslySetInnerHTML={description} />
);

const getTermsButton = onClickHandler => (
  <button className="terms" onClick={onClickHandler}>{Translator.translate('terms_and_conditions_ampersand')}</button>
);

const getProgress = (percentage, currentContributions, wageringRequirementsTarget) => (
  <div>
    <div className="wagering-requirements">
      <h4>{Translator.translate('wagering_reqs')}:</h4>
      <p>
        <span className="wagering-currency">{Currency.format(currentContributions, 2)} </span>
        {Translator.translate('wagering_of')}
        <span className="wagering-currency">{Currency.format(wageringRequirementsTarget, 2)}</span>
      </p>
    </div>
    <div className="outer-promo-progress-bar">
      <div className="inner-promo-progress-bar" style={{ width: `${percentage}%` }}>
        <span>{percentage}%</span>
      </div>
    </div>
  </div>
);

const displayStatuses = [
  'PartQualified',
  'Active'
];

export default function (props) {
  const {
    bonusType,
    canBeClaimed = false,
    clickHandler,
    description,
    displayName,
    showTerms,
    type,
    isClaimed,
    status,
    currentContributions,
    wageringRequirementsTarget
  } = props;
  const buttonProps = {
    bonusType,
    canBeClaimed,
    clickHandler,
    displayName,
    isClaimed,
    type
  };

  const percentage = ((currentContributions / wageringRequirementsTarget) * 100).toFixed(2);
  const isWelcome = type === 'welcome';
  const promoAction = isWelcome ? null : <ActionButton {...buttonProps} />;
  const termsLink = canBeClaimed || isClaimed ? getTermsButton(showTerms) : null;
  const titleEl = displayName ? <h3>{displayName}</h3> : null;
  const descriptionEl = description ? getDescription(generateDescription(description)) : null;
  const hasProgressBar = displayStatuses.includes(status) && wageringRequirementsTarget !== 0;
  const progressBar = hasProgressBar ? getProgress(percentage, currentContributions, wageringRequirementsTarget) : null;

  return (
    <div className="promo-details">
      <div className="promo-text">
        { titleEl }
        { descriptionEl }
        { progressBar }
        { promoAction }
      </div>
    </div>
  );
}
