import styled from "styled-components";

const StyledInputGroup = styled.div`
  .input {
    &-content {
      position: relative;
      z-index: 10;

      .inputbox {
        overflow: hidden;
        position: relative;
        width: 100%;

        &-title {
          position: absolute;
          top: 15px;
          left: 0;
          width: 200px;
          height: 30px;
          color: #666;
          font-weight: bold;
          line-height: 30px;
        }
        &-content {
          position: relative;
          width: 100%;

          .input-size {
            height: 40px;
          }

          input,
          textarea {
            box-sizing: border-box;
            line-height: 30px;
            font-size: 14px;
            border: 0;
            background: none;
            border: 1px solid #ccc;
            outline: none;
            width: 70%;

            margin-top: 5px;
            border-radius: 5px;
            --webkit-appearance: none;
            padding: 5px;
            &:focus,
            &:valid {
              & ~ label {
                color: $accent-color;
                transform: translateY(-30px);
                font-size: 0.825em;
                cursor: default;
              }
            }
            &:focus {
              background-color: #f7f7f72f;
              border: 2px dotted black;
            }
          }
          label {
            position: absolute;
            top: 10px;
            left: 8px;
            height: 30px;
            line-height: 30px;
            color: #ccc;
            cursor: text;
            transition: all 200ms ease-out;
            z-index: 10;
          }
        }
      }
    }
  }
`;

export const FormGroup = ({
  title,
  error,
  hasError,
  name,
  value,
  textArea,
}: {
  title: string;
  value: string;
  error?: string;
  name: string;
  hasError?: boolean;
  textArea?: boolean;
}) => {
  return (
    <StyledInputGroup>
      <section className="input-content">
        <div className="input-content-wrap">
          <dl className="inputbox">
            <dd className="inputbox-content">
              {textArea ? (
                <textarea id="input1" cols={50} rows={6} />
              ) : (
                <input
                  className="input-size "
                  name={name}
                  id="input1"
                  type="text"
                  required
                />
              )}
              <label>{title}</label>
            </dd>
          </dl>
        </div>
      </section>
    </StyledInputGroup>
  );
};
