import { TableDemoController } from "./controllers/table-demo";
import { CommandDemoController } from "./controllers/command-demo";
import { CodeExampleController } from "./controllers/code-example";
import { InboxDemoController } from "./controllers/inbox-demo";
import { ProjectDemoController } from "./controllers/project-demo";
import { SettingsDemoController } from "./controllers/settings-demo";
import { FilePreviewController } from "./controllers/file-preview";
import { DraftController } from "./controllers/draft";
import { DraftSummaryController } from "./controllers/draft-summary";
import { ArticleSearchController } from "./controllers/article-search";
import { FieldDemoController } from "./controllers/field-demo";
import { Application } from "@hotwired/stimulus";
import "@hotwired/turbo";
import {
  ClipboardController,
  CodeBlockController,
  CommandMenuController,
  TableController,
  TableSortController,
  TableSelectController,
  BoardController,
  CharacterCountController,
  CheckboxGroupController,
  ComboboxController,
  DateFieldController,
  DatePickerController,
  DialogController,
  DropdownMenuController,
  FileDropController,
  FileInputController,
  NumberFieldController,
  PasswordFieldController,
  PopoverController,
  RangeController,
  SuggestionController,
  TabsController,
  TimeFieldController,
} from "../src/controllers";

const application = Application.start();
application.register("clipboard", ClipboardController);
application.register("code-block", CodeBlockController);
application.register("board", BoardController);
application.register("table-demo", TableDemoController);
application.register("table", TableController);
application.register("table-sort", TableSortController);
application.register("table-select", TableSelectController);
application.register("inbox-demo", InboxDemoController);
application.register("command-menu", CommandMenuController);
application.register("command-demo", CommandDemoController);
application.register("code-example", CodeExampleController);
application.register("character-count", CharacterCountController);
application.register("checkbox-group", CheckboxGroupController);
application.register("combobox", ComboboxController);
application.register("date-field", DateFieldController);
application.register("date-picker", DatePickerController);
application.register("number-field", NumberFieldController);
application.register("password-field", PasswordFieldController);
application.register("range", RangeController);
application.register("suggestion", SuggestionController);
application.register("time-field", TimeFieldController);
application.register("field-demo", FieldDemoController);
application.register("project-demo", ProjectDemoController);
application.register("settings-demo", SettingsDemoController);
application.register("file-preview", FilePreviewController);
application.register("draft", DraftController);
application.register("draft-summary", DraftSummaryController);
application.register("article-search", ArticleSearchController);
application.register("dialog", DialogController);
application.register("popover", PopoverController);
application.register("dropdown-menu", DropdownMenuController);
application.register("file-drop", FileDropController);
application.register("file-input", FileInputController);
application.register("tabs", TabsController);

// 開発時の更新でApplicationとイベント登録を重複させない。
if (import.meta.hot) import.meta.hot.dispose(() => application.stop());
