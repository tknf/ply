import { classes, type ElementProps } from "./types";

export type CalendarDay = {
  day: number;
  date: string;
  current?: boolean;
  events?: readonly { label: string; href: string }[];
};
export type CalendarProps = ElementProps<"div"> & {
  label: string;
  weeks: readonly (readonly (CalendarDay | null)[])[];
};
export const Calendar = ({ label, weeks, class: className, ...attributes }: CalendarProps) => (
  <div
    {...attributes}
    class={classes("ply-calendar", className)}
    role="region"
    aria-label={label}
    tabindex={0}
  >
    <table>
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
            {Array.from({ length: 7 }, (_, index) => {
              const day = week[index];
              return (
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
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
