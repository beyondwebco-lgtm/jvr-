export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
}) {
  const isDark = theme === 'dark';
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2.5 mb-3">
          <span className="w-7 h-0.5 bg-amber-500 inline-block" aria-hidden="true" />
          <span
            className={`text-xs font-bold uppercase tracking-[0.22em] ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`}
          >
            {eyebrow}
          </span>
          {align === 'center' && (
            <span className="w-7 h-0.5 bg-amber-500 inline-block" aria-hidden="true" />
          )}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 sm:mt-4 text-sm sm:text-lg leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
