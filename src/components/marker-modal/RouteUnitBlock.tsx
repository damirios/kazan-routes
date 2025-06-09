import { ChangeEvent, FC } from "react";

type Props = {
  onChangeImage: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeText: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
};

export const RouteUnitBlock: FC<Props> = ({
  onChangeImage,
  onChangeText,
  text,
}) => {
  return (
    <div className="new-marker__route-info-block">
      <textarea
        className="route-info__text"
        onChange={onChangeText}
        value={text}
      />
      <input
        type="file"
        className="route-info__image"
        onChange={onChangeImage}
      />
    </div>
  );
};
