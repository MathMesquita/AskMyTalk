// @flow
import { toQuery } from '../../PopupWindow/utils';
import PopupWindow from '../../PopupWindow/PopupWindow';

type GithubResponse = {
  code: string
};

export type { GithubResponse };

export default function authWithGithub(
  client_id: string,
  scope: string
): Promise<GithubResponse> {
  const search: string = toQuery({
    client_id: client_id,
    scope: scope
  });

  const popup = openGithubAuthPopup(
    `https://github.com/login/oauth/authorize?${search}`
  );

  return popup;
}

function openGithubAuthPopup(popupUrl: string): Promise<GithubResponse> {
  return PopupWindow.open('github-oauth-authorize', popupUrl, {
    height: 1000,
    width: 500
  });
}
