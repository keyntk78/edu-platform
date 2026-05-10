/**
 * Cấu hình Commitlint cho dự án Edu Platform.
 *
 * Commitlint kiểm tra xem message commit có tuân thủ đúng định dạng
 * Conventional Commits hay không trước khi commit được tạo.
 *
 * @see https://commitlint.js.org/ - Tài liệu chính thức
 * @see https://www.conventionalcommits.org/ - Quy chuẩn Conventional Commits
 */
export default {
  /*
   * Kế thừa bộ quy tắc chuẩn từ @commitlint/config-conventional.
   * Bộ quy tắc này dựa trên chuẩn Conventional Commits của Angular.
   * Cấu trúc commit: type(scope?): subject
   * Ví dụ: feat(auth): thêm chức năng đăng nhập bằng email
   */
  extends: ['@commitlint/config-conventional'],

  /*
   * Định nghĩa các quy tắc tùy chỉnh (ghi đè hoặc bổ sung).
   *
   * Cấu trúc mỗi rule: rule-name: [level, applicable, value]
   * - level: 0 = tắt, 1 = cảnh báo (warning), 2 = lỗi (error)
   * - applicable: "always" (luôn áp dụng) hoặc "never" (không bao giờ)
   * - value: giá trị áp dụng cho rule đó
   */
  rules: {
    /*
     * ============================================================
     * NHÓM 1: QUY TẮC VỀ LOẠI COMMIT (TYPE)
     * ============================================================
     */

    /**
     * type-enum: Quy định danh sách các loại commit được phép sử dụng.
     *
     * Các loại commit phổ biến:
     * - feat:     tính năng mới (có thể có BREAKING CHANGE để chỉ ra thay đổi phá vỡ)
     * - fix:      sửa lỗi
     * - docs:     thay đổi về tài liệu (README, comment, JSDoc, v.v.)
     * - style:    thay đổi về định dạng, style code (dấu cách, dấu chấm phẩy, v.v.)
     *              LƯU Ý: không liên quan đến CSS styling
     * - refactor: tái cấu trúc code, không thêm tính năng mới và không sửa lỗi
     * - perf:     cải thiện hiệu năng
     * - test:     thêm hoặc sửa test
     * - build:    thay đổi ảnh hưởng đến hệ thống build hoặc dependencies bên ngoài
     *              (ví dụ: npm, webpack, nx)
     * - ci:       thay đổi cấu hình CI/CD (GitHub Actions, Jenkins, v.v.)
     * - chore:    các công việc lặt vặt không ảnh hưởng đến code production
     *              (cập nhật package, config tooling, v.v.)
     * - revert:   hoàn tác một commit trước đó
     */
    'type-enum': [
      2, // level 2 = error: bắt buộc phải dùng đúng type
      'always', // luôn kiểm tra
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
    ],

    /**
     * type-case: Quy định kiểu chữ của type.
     * lower-case: tất cả chữ thường (feat, fix, docs,...)
     */
    'type-case': [2, 'always', 'lower-case'],

    /**
     * type-empty: Không cho phép type bị bỏ trống.
     */
    'type-empty': [2, 'never'],

    /*
     * ============================================================
     * NHÓM 2: QUY TẮC VỀ PHẠM VI (SCOPE)
     * ============================================================
     */

    /**
     * scope-case: Quy định kiểu chữ của scope.
     * lower-case: scope phải viết thường.
     * Ví dụ: feat(auth): ... -> đúng, feat(Auth): ... -> sai
     */
    'scope-case': [2, 'always', 'lower-case'],

    /**
     * scope-empty: Cho phép scope được bỏ trống.
     * level 0 = tắt: không bắt buộc phải có scope trong commit.
     */
    'scope-empty': [0, 'never'],

    /*
     * ============================================================
     * NHÓM 3: QUY TẮC VỀ TIÊU ĐỀ COMMIT (SUBJECT)
     * ============================================================
     */

    /**
     * subject-empty: Không cho phép tiêu đề commit bị bỏ trống.
     */
    'subject-empty': [2, 'never'],

    /**
     * subject-case: Quy định kiểu chữ của tiêu đề.
     * Các giá trị không được phép:
     * - sentence-case: Viết hoa chữ cái đầu (không cho phép)
     * - start-case: Viết hoa mỗi từ (không cho phép)
     * - pascal-case: PascalCase (không cho phép)
     * - upper-case: VIẾT HOA TOÀN BỘ (không cho phép)
     *
     * => Chỉ chấp nhận lower-case (viết thường) cho chữ cái đầu tiên.
     */
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],

    /**
     * subject-full-stop: Không cho phép dấu chấm (.) ở cuối tiêu đề.
     * Ví dụ: feat: thêm tính năng đăng nhập -> đúng
     *         feat: thêm tính năng đăng nhập. -> sai (có dấu chấm cuối)
     */
    'subject-full-stop': [2, 'never', '.'],

    /*
     * ============================================================
     * NHÓM 4: QUY TẮC VỀ NỘI DUNG (BODY)
     * ============================================================
     */

    /**
     * body-leading-blank: Yêu cầu một dòng trống trước body.
     * Điều này giúp phân tách rõ ràng giữa tiêu đề và nội dung chi tiết.
     */
    'body-leading-blank': [1, 'always'],

    /**
     * body-max-line-length: Giới hạn độ dài mỗi dòng trong body.
     * 100 ký tự là giới hạn phổ biến, giúp dễ đọc trên các trình Git client.
     *
     * LƯU Ý: Quy tắc này chỉ áp dụng cho body, không áp dụng cho tiêu đề.
     *        Tiêu đề có quy tắc riêng (xem header-max-length).
     */
    'body-max-line-length': [1, 'always', 100],

    /*
     * ============================================================
     * NHÓM 5: QUY TẮC VỀ CHÂN TRANG (FOOTER)
     * ============================================================
     */

    /**
     * footer-leading-blank: Yêu cầu một dòng trống trước footer.
     * Footer thường chứa các tham chiếu đến issue, breaking changes, v.v.
     */
    'footer-leading-blank': [1, 'always'],

    /**
     * footer-max-line-length: Giới hạn độ dài mỗi dòng trong footer.
     */
    'footer-max-line-length': [1, 'always', 100],

    /*
     * ============================================================
     * NHÓM 6: QUY TẮC VỀ TIÊU ĐỀ (HEADER)
     * ============================================================
     */

    /**
     * header-max-length: Giới hạn độ dài tối đa của toàn bộ dòng tiêu đề.
     * 300 ký tự là giới hạn được khuyến nghị để hiển thị đẹp trên GitHub.
     *
     * Cấu trúc tiêu đề: type(scope?): subject
     * Ví dụ: feat(auth): thêm chức năng đăng nhập bằng email và mật khẩu (300 ký tự)
     */
    'header-max-length': [2, 'always', 300],
  },

  /*
   * ============================================================
   * CẤU HÌNH PARSER PRESET
   * ============================================================
   * Sử dụng parser mặc định của conventional-changelog để phân tích
   * message commit. Parser này hiểu các định dạng như:
   * - BREAKING CHANGE: mô tả
   * - Closes #123
   * - Refs: #456
   */
  parserPreset: 'conventional-changelog-conventionalcommits',

  /*
   * ============================================================
   * CẤU HÌNH MỞ RỘNG
   * ============================================================
   */

  /**
   * defaultIgnores: Bỏ qua kiểm tra commitlint đối với một số message
   * được tạo tự động bởi các công cụ.
   *
   * - true (mặc định): bỏ qua các commit merge, revert, squash của GitHub
   * - false: kiểm tra tất cả các commit (nghiêm ngặt hơn)
   */
  defaultIgnores: true,

  /**
   * helpUrl: Đường dẫn trợ giúp hiển thị khi commit bị reject.
   * Người dùng có thể truy cập link này để xem hướng dẫn chi tiết.
   */
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
};
