import { prettifyHtml } from '../../../../helpers';
import { avatarClassName } from '../../../../configs';
import exampleAvatar from '../../../../images/exampleAvatar.png';

export const Avatar = ({
  size,
  shape = 'square',
  src = exampleAvatar,
  additionalClasses
}) => {
  const shapeClass = `${avatarClassName}--${shape}`;
  const elementAdditionalClasses = additionalClasses ? additionalClasses : '';

  const resultElement =
  `<div
    class="${avatarClassName} ${shapeClass} ${elementAdditionalClasses}"
    style="--sgAvatarSize: ${size};">
    <img property="image"
      alt="Name"
      src="${src}"
    >
  </div>`;

  return prettifyHtml(resultElement);
};
