export const FooterLinkConfig = {
  FooterLinks: [
    {linkName: 'Sitemap', href: '#'},
    {linkName: 'Privacy', href: '#'},
    {linkName: 'Terms', href: '/termsAndconditions'},
    {linkName: 'General Terms & Conditions', href: '#'},
    {linkName: 'Help', href: '/helppage'},
  ],
};

export interface FooterLinkConfigObject {
  linkName?: string;
  href?: string;
}
