type IconProps = { size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const IconHome = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9h13v-9" /></svg>
)
export const IconKanban = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><rect x="3" y="4" width="5" height="16" rx="1.2" /><rect x="9.5" y="4" width="5" height="10" rx="1.2" /><rect x="16" y="4" width="5" height="13" rx="1.2" /></svg>
)
export const IconBriefcase = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><rect x="3" y="7.5" width="18" height="12" rx="1.5" /><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" /><path d="M3 12.5h18" /></svg>
)
export const IconUsers = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17.5" cy="9" r="2.3" /><path d="M21 20c0-2.6-1.7-4.8-4-5.6" /></svg>
)
export const IconChart = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M4 20V10" /><path d="M11 20V4" /><path d="M18 20v-7" /><path d="M3 20h18" /></svg>
)
export const IconSettings = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="3" /><path d="M19.4 13.5a7.7 7.7 0 0 0 0-3l1.9-1.3-2-3.4-2.2.6a7.6 7.6 0 0 0-2.6-1.5L14 2h-4l-.5 2.4a7.6 7.6 0 0 0-2.6 1.5l-2.2-.6-2 3.4L4.6 10.5a7.7 7.7 0 0 0 0 3L2.7 14.8l2 3.4 2.2-.6a7.6 7.6 0 0 0 2.6 1.5L10 22h4l.5-2.4a7.6 7.6 0 0 0 2.6-1.5l2.2.6 2-3.4-1.9-1.3Z" /></svg>
)
export const IconSearch = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
)
export const IconBell = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
)
export const IconPlus = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M12 5v14M5 12h14" /></svg>
)
export const IconArrowLeft = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></svg>
)
export const IconArrowRight = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M5 12h14" /><path d="m13 18 6-6-6-6" /></svg>
)
export const IconX = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const IconMail = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const IconCalendar = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M8 3v4M16 3v4" /></svg>
)
export const IconAlertTriangle = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M12 4 2 20h20L12 4Z" /><path d="M12 10v5" /><path d="M12 18h.01" /></svg>
)
export const IconSliders = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h13M21 18h-1" /><circle cx="15" cy="6" r="2" /><circle cx="7" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></svg>
)
export const IconPencil = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" /><path d="m14.5 6 3 3" /></svg>
)
export const IconTrash = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></svg>
)
export const IconEye = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
)
export const IconCheck = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M4 12.5 9 17l11-11" /></svg>
)
export const IconUser = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>
)
export const IconPhone = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
)
export const IconPaperclip = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M21 11.5 12.5 20a4 4 0 0 1-5.7-5.7L15 6a2.7 2.7 0 0 1 3.8 3.8L10.5 18a1.3 1.3 0 0 1-1.9-1.9l7-7" /></svg>
)
export const IconGlobe = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" /></svg>
)
export const IconBolt = ({ size = 16 }: IconProps) => (
  <svg {...base(size)} fill="currentColor" stroke="none"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
)
export const IconArrowDown = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></svg>
)
export const IconClipboard = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" /><path d="M9 11h6M9 15h6" /></svg>
)
export const IconStar = ({ size = 16 }: IconProps) => (
  <svg {...base(size)} fill="currentColor" stroke="none"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" /></svg>
)
export const IconCopy = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>
)
export const IconChevronUp = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="m6 15 6-6 6 6" /></svg>
)
export const IconReply = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 6 6v2" /></svg>
)
