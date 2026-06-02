/**
 * VPN apps verified to return a mirror download via /api/download-apk.
 * Order: more recognizable / stable mirrors first.
 */
export const VPN_DOWNLOADABLE_APP_IDS = [
  "cloud.centaur.gojgp",
  "com.sticktoit",
  "com.shieldmeta.dash.s",
  "ch.protonvpn.android",
  "com.windscribe.vpn",
  "com.privateinternetaccess.android",
  "net.openvpn.openvpn",
  "org.torproject.android",
] as const;
