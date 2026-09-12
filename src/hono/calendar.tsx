export type CalendarDay = {
  day: number;
  date: string;
  current?: boolean;
  events?: readonly { label: string; href: string }[];
};
export type CalendarProps = { label: string; weeks: readonly (readonly (CalendarDay | null)[])[] };
export const Calendar = ({ label, weeks }: CalendarProps) => (
  <div class="ply-calendar-scroll" role="region" aria-label={label} tabindex={0}>
    <table class="ply-calendar">
      <caption>{label}</caption>
      <thead>
        <tr>
          {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
            <th scope="col">{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week) => (
          <tr>
            {week.map((day) => (
              <td data-current={day?.current ? "true" : undefined}>
                {day && (
                  <>
                    <time datetime={day.date} aria-current={day.current ? "date" : undefined}>
                      {day.day}
                    </time>
                    {day.events?.map((event) => (
                      <a href={event.href}>{event.label}</a>
                    ))}
                  </>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
