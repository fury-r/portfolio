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
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        &-title {
          position: absolute;
          top: 10px;
          left: 0;
          width: 250px;
          height: 35px;
          color: #666;
          font-weight: bold;
          line-height: 30px;
        }
        &-content {
          position: relative;
          width: 80%;
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: end;
          .input-size {
            height: 40px;
          }

          input,
          textarea {
            box-sizing: border-box;
            line-height: 30px;
            font-size: 14px;
            border: none;
            background: var(--primary-color);
            border: 1px solid var(--secondary-color);
            outline: none;
            width: 100%;

            margin-top: 5px;
            border-radius: 5px;
            --webkit-appearance: none;
            padding: 5px;
            &:focus,
            &:valid {
              & ~ label {
                color: var(--color);
                transform: translateY(-28px);
                font-size: 0.825em;
                font-weight: bold;
                cursor: default;
              }
            }
            &:focus {
              /* background-color: #f7f7f72f; */
              border: 1px dotted black;
            }
            &::placeholder {
              color: var(--color);
            }
          }
          label {
            position: absolute;
            top: 35px;
            left: 8px;
            height: 30px;
            line-height: 30px;
            pointer-events: none;
            color: var(--color);
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
  name,
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
            <dd className="inputbox-content ">
              {textArea ? (
                <>
                  <textarea
                    id="input1"
                    cols={50}
                    rows={6}
                    placeholder={title}
                    name={name}
                  />
                </>
              ) : (
                <>
                  <input
                    className="input-size "
                    name={name}
                    id="input1"
                    type="text"
                    required
                  />
                  <label>{title}</label>
                </>
              )}
            </dd>
          </dl>
        </div>
      </section>
    </StyledInputGroup>
  );
};
