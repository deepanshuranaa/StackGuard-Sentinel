import type { BlastRadiusServiceData } from '../types/blast-radius';

// ─── SendGrid ────────────────────────────────────────────────────
const sendgridData: BlastRadiusServiceData = {
  service: 'SendGrid',
  valid_key: true,
  key_type: 'Full Access Key',
  '2fa_required': true,
  total_scopes: 42,
  total_raw_scopes: 206,
  scopes: [
    { scope: 'API Keys', sub_scope: '', access: 'Read & Write', permissions: ['api_keys.create', 'api_keys.delete', 'api_keys.read', 'api_keys.update'] },
    { scope: 'Alerts', sub_scope: '', access: 'Read & Write', permissions: ['alerts.create', 'alerts.delete', 'alerts.read', 'alerts.update'] },
    { scope: 'Category Management', sub_scope: '', access: 'Read & Write', permissions: ['categories.create', 'categories.delete', 'categories.read', 'categories.stats.read', 'categories.stats.sums.read', 'categories.update'] },
    { scope: 'IP Management', sub_scope: '', access: 'Read', permissions: ['ips.pools.ips.read'] },
    { scope: 'Inbound Parse', sub_scope: '', access: 'Read & Write', permissions: ['user.webhooks.parse.settings.create', 'user.webhooks.parse.settings.delete', 'user.webhooks.parse.settings.read', 'user.webhooks.parse.settings.update'] },
    { scope: 'Mail Send', sub_scope: 'Mail Send', access: 'Read & Write', permissions: ['mail.send'] },
    { scope: 'Mail Settings', sub_scope: 'Address Allow List', access: 'Read & Write', permissions: ['mail_settings.address_whitelist.read', 'mail_settings.address_whitelist.update'] },
    { scope: 'Mail Settings', sub_scope: 'Bounce Purge', access: 'Read & Write', permissions: ['mail_settings.bounce_purge.read', 'mail_settings.bounce_purge.update'] },
    { scope: 'Mail Settings', sub_scope: 'Event Notification', access: 'Read & Write', permissions: ['user.webhooks.event.settings.read', 'user.webhooks.event.settings.update', 'user.webhooks.event.test.create', 'user.webhooks.event.test.read', 'user.webhooks.event.test.update'] },
    { scope: 'Mail Settings', sub_scope: 'Footer', access: 'Read & Write', permissions: ['mail_settings.footer.read', 'mail_settings.footer.update'] },
    { scope: 'Mail Settings', sub_scope: 'Forward Bounce', access: 'Read & Write', permissions: ['mail_settings.forward_bounce.read', 'mail_settings.forward_bounce.update'] },
    { scope: 'Mail Settings', sub_scope: 'Forward Spam', access: 'Read & Write', permissions: ['mail_settings.forward_spam.read', 'mail_settings.forward_spam.update'] },
    { scope: 'Mail Settings', sub_scope: 'Legacy Email Template', access: 'Read & Write', permissions: ['mail_settings.template.read', 'mail_settings.template.update'] },
    { scope: 'Mail Settings', sub_scope: 'Plain Content', access: 'Read & Write', permissions: ['mail_settings.plain_content.read', 'mail_settings.plain_content.update'] },
    { scope: 'Partners', sub_scope: '', access: 'Read & Write', permissions: ['partner_settings.new_relic.read', 'partner_settings.new_relic.update', 'partner_settings.read'] },
    { scope: 'Security', sub_scope: '', access: 'Read & Write', permissions: ['access_settings.activity.read', 'access_settings.whitelist.create', 'access_settings.whitelist.delete', 'access_settings.whitelist.read', 'access_settings.whitelist.update'] },
    { scope: 'Sender Authentication', sub_scope: '', access: 'Read & Write', permissions: ['whitelabel.create', 'whitelabel.delete', 'whitelabel.read', 'whitelabel.update'] },
    { scope: 'Stats', sub_scope: 'Browser Stats', access: 'Read', permissions: ['browsers.stats.read'] },
    { scope: 'Stats', sub_scope: 'Email Clients and Devices', access: 'Read', permissions: ['clients.desktop.stats.read', 'clients.phone.stats.read', 'clients.stats.read', 'clients.tablet.stats.read', 'clients.webmail.stats.read', 'devices.stats.read'] },
    { scope: 'Stats', sub_scope: 'Geographical', access: 'Read', permissions: ['geo.stats.read'] },
    { scope: 'Stats', sub_scope: 'Global Stats', access: 'Read', permissions: ['stats.global.read'] },
    { scope: 'Stats', sub_scope: 'Mailbox Provider Stats', access: 'Read', permissions: ['mailbox_providers.stats.read'] },
    { scope: 'Stats', sub_scope: 'Parse Webhook', access: 'Read', permissions: ['user.webhooks.parse.stats.read'] },
    { scope: 'Stats', sub_scope: 'Stats Overview', access: 'Read', permissions: ['stats.read'] },
    { scope: 'Stats', sub_scope: 'Subuser Stats', access: 'Read', permissions: ['subusers.stats.monthly.read', 'subusers.stats.read', 'subusers.stats.sums.read'] },
    { scope: 'Suppressions', sub_scope: 'Suppressions', access: 'Read & Write', permissions: ['suppression.blocks.create', 'suppression.blocks.delete', 'suppression.blocks.read', 'suppression.blocks.update', 'suppression.bounces.create', 'suppression.bounces.delete', 'suppression.bounces.read', 'suppression.bounces.update', 'suppression.create', 'suppression.delete', 'suppression.invalid_emails.create', 'suppression.invalid_emails.delete', 'suppression.invalid_emails.read', 'suppression.invalid_emails.update', 'suppression.read', 'suppression.spam_reports.create', 'suppression.spam_reports.delete', 'suppression.spam_reports.read', 'suppression.spam_reports.update', 'suppression.unsubscribes.create', 'suppression.unsubscribes.delete', 'suppression.unsubscribes.read', 'suppression.unsubscribes.update', 'suppression.update'] },
    { scope: 'Suppressions', sub_scope: 'Unsubscribe Groups', access: 'Read & Write', permissions: ['asm.groups.create', 'asm.groups.delete', 'asm.groups.read', 'asm.groups.update'] },
    { scope: 'Template Engine', sub_scope: '', access: 'Read & Write', permissions: ['templates.create', 'templates.delete', 'templates.read', 'templates.update', 'templates.versions.activate.create', 'templates.versions.activate.delete', 'templates.versions.activate.read', 'templates.versions.activate.update', 'templates.versions.create', 'templates.versions.delete', 'templates.versions.read', 'templates.versions.update'] },
    { scope: 'Tracking', sub_scope: 'Click Tracking', access: 'Read & Write', permissions: ['tracking_settings.click.read', 'tracking_settings.click.update'] },
    { scope: 'Tracking', sub_scope: 'Google Analytics', access: 'Read & Write', permissions: ['tracking_settings.google_analytics.read', 'tracking_settings.google_analytics.update'] },
    { scope: 'Tracking', sub_scope: 'Open Tracking', access: 'Read & Write', permissions: ['tracking_settings.open.read', 'tracking_settings.open.update'] },
    { scope: 'Tracking', sub_scope: 'Subscription Tracking', access: 'Read & Write', permissions: ['tracking_settings.subscription.read', 'tracking_settings.subscription.update'] },
    { scope: 'User Account', sub_scope: 'Enforced TLS', access: 'Read & Write', permissions: ['user.settings.enforced_tls.read', 'user.settings.enforced_tls.update'] },
    { scope: 'User Account', sub_scope: 'Timezone', access: 'Read', permissions: ['user.timezone.read'] },
    { scope: 'Mail Settings', sub_scope: '', access: 'Read', permissions: ['mail_settings.read'] },
    { scope: 'Teammates', sub_scope: '', access: 'Read & Write', permissions: ['teammates.create', 'teammates.delete', 'teammates.read', 'teammates.update'] },
    { scope: 'Tracking', sub_scope: '', access: 'Read', permissions: ['tracking_settings.read'] },
    { scope: 'User Account', sub_scope: 'Account', access: 'Read', permissions: ['user.account.read'] },
    { scope: 'User Account', sub_scope: 'Credits', access: 'Read', permissions: ['user.credits.read'] },
    { scope: 'User Account', sub_scope: 'Email', access: 'Read', permissions: ['user.email.read'] },
    { scope: 'User Account', sub_scope: 'Profile', access: 'Read & Write', permissions: ['user.profile.read', 'user.profile.update'] },
    { scope: 'User Account', sub_scope: 'Username', access: 'Read', permissions: ['user.username.read'] },
  ],
};

// ─── Postman ─────────────────────────────────────────────────────
const postmanData: BlastRadiusServiceData = {
  service: 'Postman',
  valid_key: true,
  key_type: 'User API Key',
  total_roles: 1,
  total_workspaces: 1,
  user_info: {
    username: 'cyberkartik',
    email: 'cyberkartik+1@gmail.com',
    full_name: 'Kartik',
    roles: ['user'],
  },
  team_info: { name: '', domain: 'https://.postman.co' },
  roles: [
    { scope: 'user', permissions: 'Has access to all team resources and workspaces.' },
  ],
  workspaces: [
    {
      id: 'ddb30ec5-8039-4a1a-8a26-8f8600b74002',
      name: 'My Workspace',
      type: 'personal',
      visibility: 'personal',
      link: 'https://go.postman.co/workspaces/ddb30ec5-8039-4a1a-8a26-8f8600b74002',
    },
  ],
  // Synthesize scopes from roles for unified processing
  scopes: [
    { scope: 'Team Resources', sub_scope: 'All Workspaces', access: 'Read & Write', permissions: ['team.resources.all'] },
    { scope: 'Workspaces', sub_scope: 'My Workspace', access: 'Read & Write', permissions: ['workspace.personal.read', 'workspace.personal.write'] },
    { scope: 'Collections', sub_scope: '', access: 'Read & Write', permissions: ['collections.read', 'collections.write'] },
    { scope: 'Environments', sub_scope: '', access: 'Read & Write', permissions: ['environments.read', 'environments.write'] },
    { scope: 'APIs', sub_scope: '', access: 'Read & Write', permissions: ['apis.read', 'apis.write'] },
  ],
};

// ─── OpenAI ──────────────────────────────────────────────────────
const openaiData: BlastRadiusServiceData = {
  service: 'OpenAI',
  valid_key: true,
  key_type: 'Service Account API Key',
  is_restricted: true,
  is_admin: false,
  user_info_available: false,
  total_organizations: 1,
  total_scopes: 8,
  organizations: [
    {
      id: 'org-41kmBXa62vSo7BRlZqGZWzFL',
      title: 'Mesh.ai',
      user: 'mesh-4',
      default: true,
      role: 'reader',
      description: '',
      personal: false,
    },
  ],
  scopes: [
    { scope: '/v1/models', sub_scope: '', access: 'Read', permissions: ['/v1/models'], endpoints: ['/v1/models'] },
    { scope: '/v1/audio', sub_scope: '', access: 'Write', permissions: ['/v1/audio', '/v1/chat/completions', '/v1/embeddings', '/v1/images', '/v1/moderations'], endpoints: ['/v1/audio', '/v1/chat/completions', '/v1/embeddings', '/v1/images', '/v1/moderations'] },
    { scope: '/v1/assistants', sub_scope: '', access: 'Read & Write', permissions: ['/v1/assistants'], endpoints: ['/v1/assistants'] },
    { scope: '/v1/threads', sub_scope: '', access: 'Read & Write', permissions: ['/v1/threads'], endpoints: ['/v1/threads'] },
    { scope: '/v1/fine_tuning', sub_scope: '', access: 'Read & Write', permissions: ['/v1/fine_tuning'], endpoints: ['/v1/fine_tuning'] },
    { scope: '/v1/files', sub_scope: '', access: 'Read & Write', permissions: ['/v1/files'], endpoints: ['/v1/files'] },
    { scope: '/v1/evals', sub_scope: '', access: 'Read & Write', permissions: ['/v1/evals'], endpoints: ['/v1/evals'] },
    { scope: '/v1/responses', sub_scope: '', access: 'Read & Write', permissions: ['/v1/responses'], endpoints: ['/v1/responses'] },
  ],
};

export function getMockBlastRadiusData(): BlastRadiusServiceData[] {
  return [sendgridData, postmanData, openaiData];
}
